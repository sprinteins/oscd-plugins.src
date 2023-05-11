<svelte:options tag="tscd-dedupe" />

<script lang="ts">
	import css from "./dedupe.scss?inline"
	import { UCTypeDedupe, SCDQueries, type HashedDOT, type DOElement, type DOTypeElement } from "@oscd-plugins/core"
	import GroupCardList from "./group-card-list/group-card-list.svelte"
	import Merger from "./merger/merger.svelte"
	import type { MergableItem } from "./merger/mergable-items"
	import Theme from "../../style/theme.svelte"

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
		loadDuplicates()
	}

	let duplicateGroups: HashedDOT[][]
	async function loadDuplicates(){
		duplicateGroups = await deduper.findDuplicateObjectTypes()
	}
	
	let itemSets: MergableItem[][] = []
	$: convertDuplicatesToItems(duplicateGroups)
	function convertDuplicatesToItems(groups?: HashedDOT[][]){
		if(!groups){ return }

		itemSets = groups.map((group) => {
			return group.map((item) => {
				return {
					label:  item.element.id,
					usages: item.usages.map(getParentId),
				}
			})
		})
	}

	function getParentId(doEl: DOElement): string {
		const notFoundId = "_"
		const parent = doEl.element.parentElement
		if(!parent){ return notFoundId }

		return parent.getAttribute("id")??notFoundId
	}	
	
	let selectedGroupIndex = -1
	function handleGroupSelect(e: CustomEvent<{index:number}>){
		selectedGroupIndex = e.detail.index
	}
	

	// 
	// Merger
	// 
	let structure: string[] = []
	$: loadStructureOfFirstElement(duplicateGroups, selectedGroupIndex)
	function loadStructureOfFirstElement(groups: HashedDOT[][], index: number){
		if(index < 0){ return }
		const selectedGroup = groups[index]
		const firstElement = selectedGroup[0]
		const children = Array.from(firstElement.element.element.children)
		const names = children.map((child) => child.getAttribute("name")??"")
		structure = names.filter(Boolean)
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

	function createRelinkActions(doEl: DOElement, dot: DOTypeElement){
		const deep = true
		const modifiedEl = doEl.element.cloneNode(true) as Element
		modifiedEl.setAttribute("type", dot.id)

		const actions = createEventDetail(doEl.element, modifiedEl)
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
			<GroupCardList 
				itemSets={itemSets.map((itemSet) => itemSet.map((item) => item.label) )} 
				on:select={handleGroupSelect} 
				selectedIndex={selectedGroupIndex}
			/>
		</sidebar>
		
		<main>
			{#if selectedGroupIndex > -1}
			{#key selectedGroupIndex}
				<Merger 
					items={itemSets[selectedGroupIndex]} 
					structure={structure}
					on:merge={handleMerge}
				/>
			{/key}
			{/if}
		</main>
	</layout>
</dedupe>

<svelte:element this="style">{@html css}</svelte:element>
