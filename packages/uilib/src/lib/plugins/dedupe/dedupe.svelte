

<script lang="ts">
	import { UCTypeDedupe, SCDQueries, type SCDElement, type HashedTypeElement, type TypeElement } from "@oscd-plugins/core"
	import GroupCardList from "./group-card-list/group-card-list.svelte"
	import Merger from "./merger/merger.svelte"
	import { NullParentElement, type MergableItem, type ParentElement } from "./merger/mergable-items"
	import Theme from "../../style/theme.svelte"
	import { ButtonGroup, type ButtonGroupOption } from "../../components/button-group"

	// Input
	export let doc: Element
	
	// Config
	let scdQueries: SCDQueries
	let deduper: UCTypeDedupe
	let root: HTMLElement


	// 
	// Groups
	// 
	$: init(doc)
	function init(document: Element){
		if(!document){ return }
		scdQueries  = new SCDQueries(document)
		deduper = new UCTypeDedupe(scdQueries)
	}

	
	// $: loadDuplicates(selectedType)
	let duplicateGroups: HashedTypeElement<TypeElement>[][] = []
	$: loadDuplicates(selectedType)
	async function loadDuplicates(type: string){
		if(type === SCDQueries.SelectorDOType){
			duplicateGroups =  await deduper.findDuplicateObjectTypes()
			return 
		}
		if(type === SCDQueries.SelectorDAType) {
			duplicateGroups = await deduper.findDuplicateDataAttributeTypes()
			return
		}
		if(type === SCDQueries.SelectorLNodeType){
			duplicateGroups = await deduper.findDuplicateLogicalNodeTypes()
			return
		}
		if(type === SCDQueries.SelectorEnumType){
			duplicateGroups = await deduper.findDuplicateEnumTypes()
			return
		}

		duplicateGroups = []

	}
	
	let itemSets: MergableItem[][] = []
	$: itemSets = convertDuplicatesToItems(duplicateGroups)
	function convertDuplicatesToItems(groups?: HashedTypeElement<TypeElement>[][]): MergableItem[][]{
		if(!groups){ return []}
		return groups.map((group) => {
			return group.map((item) => {
				return {
					label:  item.element.id,
					usages: item.usages.map(getParent),
				}
			})
		})
	}

	function getParent(doEl: SCDElement): ParentElement {
	
		const notFoundName = "~name not found~"
		const parent = doEl.element.parentElement
		if(!parent){ return NullParentElement }

		const prioritizedNameAttributes = [
			"id",
			"name",
			"desc",
		]

		let name = notFoundName
		for( const attr of prioritizedNameAttributes ){
			const value = parent.getAttribute(attr)
			if(value){
				name = value
				break
			}
		}

		const parentElement: ParentElement = {
			name,
			type: parent.tagName,
		}

		return parentElement
	}	
	
	let selectedGroupIndex = -1
	function handleGroupSelect(e: CustomEvent<{index:number}>){
		selectedGroupIndex = e.detail.index
	}

	
	const typeOptions: ButtonGroupOption[] = [
		{ id: SCDQueries.SelectorLNodeType, label: "LNType" },
		{ id: SCDQueries.SelectorDOType,    label: "DOType" },
		{ id: SCDQueries.SelectorDAType,    label: "DAType" },
		{ id: SCDQueries.SelectorEnumType,  label: "EnumType" },
	]

	let selectedType: string = typeOptions[0].id
	function handleTypeChange(e: Event){
		const target = e.target as HTMLInputElement
		const type = target.value
		selectedType = type
	}


	// 
	// Merger
	// 
	let structure: string[] = []
	$: loadStructureOfFirstElement(duplicateGroups, selectedGroupIndex)
	function loadStructureOfFirstElement(groups: HashedTypeElement<TypeElement>[][], index: number){

		const hasSelection = index > -1
		if(!hasSelection){ 
			resetStructure()
			return
		}

		const hasGroups = groups.length > 0
		if(!hasGroups){ 
			resetStructure()
			return	
		}

		const selectedGroup = groups[index]
		const hasElements = selectedGroup?.length > 0
		if(!hasElements){ 
			resetStructure()
			return	
		}

		const firstElement = selectedGroup[0]
		const children = Array.from(firstElement.element.element.children)
		const names = children.map((child) => child.getAttribute("name")??child.textContent??"~" )
		structure = names.filter(Boolean)
	}
	function resetStructure(){
		structure = []
	}
	

	function handleMerge(e: CustomEvent<{selectedIndexes: number[], selectedMergeTargetIndex:number}>){
		const {selectedIndexes, selectedMergeTargetIndex} = e.detail
		const selectedGroup = duplicateGroups[selectedGroupIndex]
		const mergeSources = selectedIndexes.map( (index) => selectedGroup[index])
		const mergeTarget = selectedGroup[selectedMergeTargetIndex]

		const actions = mergeSources.map((source) => {
			return source.usages.map((doEl) => {
				return createRelinkActions(doEl, mergeTarget.element)
			})
		}).flat()

		const detail = {
			action: {
				actions,
			},
		}
		const event = new CustomEvent("editor-action", {
			detail,
			composed: true,
			bubbles:  true,
		})
		root.dispatchEvent(event)
	}

	function createRelinkActions(els: SCDElement, typeEl: TypeElement){
		const deep = true
		const modifiedEl = els.element.cloneNode(deep) as Element
		modifiedEl.setAttribute("type", typeEl.id)

		const actions = createEventDetail(els.element, modifiedEl)
		return actions
	}
	interface Replace {
		old: { element: Element };
		new: { element: Element };
		derived?: boolean;
		checkValidity?: () => boolean;
	}

	function createEventDetail(oldEl: Element, newEl: Element){
		const detail: Replace = {
			old: { element: oldEl },
			new: { element: newEl },
		}
		
		return detail
	}


</script>

<Theme />
<dedupe bind:this={root}>
	<layout>
		
		<sidebar>
			<h3>Duplicates</h3>
			<div>
				<ButtonGroup 
					options={typeOptions} 
					selectedID={typeOptions[0].id} 
					on:change={handleTypeChange} 
				/>
			</div>
			<GroupCardList 
				itemSets={itemSets.map((itemSet) => itemSet.map((item) => item.label) )} 
				on:select={handleGroupSelect} 
				selectedIndex={selectedGroupIndex}
			/>
		</sidebar>
		
		<main>
			{#if selectedGroupIndex > -1}
			{#key `${selectedGroupIndex}_${selectedType}`}
				<Merger 
					items={itemSets[selectedGroupIndex]??[]} 
					structure={structure}
					on:merge={handleMerge}
				/>
			{/key}
			{/if}
		</main>
	</layout>
</dedupe>

<style>
	dedupe{
		--header-hight: 146px;
		height:  calc( 100vh - var(--header-hight));
		display: block;
		padding: 1rem;
		overflow: hidden;
	}


	main {
			height: 100%;
			overflow: hidden;
	}
	layout{
		display: grid;
		grid-template-columns: 330px 1fr;
		height: 100%;
	}

	sidebar{
		border-right :  black thin solid;
		padding-right:  1rem;
		height: 	    100%;
		overflow: 	    auto;
		display:        flex;
		flex-direction: column;
		gap: 			1rem;
	}

</style>
