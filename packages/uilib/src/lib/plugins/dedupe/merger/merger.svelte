
<script lang="ts">

	import { Button } from "../../../components/button"
	import Checkbox from "../../../components/checkbox/checkbox.svelte"
	import type { MergableItem } from "./mergable-items"
	import { createEventDispatcher } from "svelte"

	// Input
	export let items: MergableItem[] = []
	export let structure: string[] = []
	// Setup
	const dispatch = createEventDispatcher()

	type AffectedElement = {
		name: string,
		type: string,
		dot: string,
	}

	// Actions
	let checkedIndexes: Set<number> = new Set()
	let affectedElements: AffectedElement[] = []
	function handleChange(index: number, e: Event) {
		const input = e.target as HTMLInputElement
		if(input.checked){
			checkedIndexes.add(index)
		}else {
			checkedIndexes.delete(index)
		}
		// checkedIndexes.set(index, input.checked)
		checkedIndexes = checkedIndexes
	}

	function generateAffectedLNTypes(indexes: number[]): AffectedElement[]{
		const newAffectedElements: AffectedElement[] = []
		for(const index of indexes){
			const item = items[index]
			const usages = item.usages
			for( const userElement of usages){
				newAffectedElements.push({
					name: userElement.name,
					type: userElement.type,
					dot:  item.label,})
			}
		}
		return newAffectedElements
	}
	$: affectedElements = generateAffectedLNTypes([...checkedIndexes.values()])


	$: isMergePossible = isSomeDuplicateSelected && isTargetSelected
	function handleMergeClick(e: MouseEvent){
		const selectedIndexes = [...Array.from( checkedIndexes.values() )]
		if(!isMergePossible){ return }
		dispatch("merge", {selectedIndexes, selectedMergeTargetIndex})
	}

	let selectedMergeTargetIndex = -1
	function handleTargetInputChange(e: Event){
		const input = e.target as HTMLInputElement
		const value = input.value
		const index = parseInt(value)

		selectedMergeTargetIndex = index
	}
	$: isTargetSelected = selectedMergeTargetIndex > -1

	// $: isSomeDuplicateSelected = [...checkedIndexes.values()].some(Boolean)
	$: isSomeDuplicateSelected = checkedIndexes.size > 0
	function handleSelectAll(e: Event){
		const checked = (e.target as HTMLInputElement).checked
		items.forEach((item, index) => checkedIndexes.add(index))
		checkedIndexes = checkedIndexes
	}

</script>

<merger>

	<div class="structure">
		<h3>Structure</h3>
		<ul class="structure-list">
			{#each structure as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="list-container">
		<h3>Duplicate DOTypes</h3>
		<div class="select-all-container">
			<Button 
				label="Select All" 
				testid="merger_select-all"
				type="secondary"
				on:click={handleSelectAll} 
			/>
		</div>

		<ul class="list">
			{#each items as item, ii}
				<li>
					<Checkbox 
						checked={checkedIndexes.has(ii)} 
						label={item.label} 
						on:change={e => handleChange(ii, e)}
						testid={`merger_checkbox-${ii}`}
					/>
				</li>
			{/each}
		</ul>
	</div>

	<div class="usage">
		<h3>Affected Nodes</h3>
		<ul>
			{#each affectedElements as element}
				<li>[{element.type}] {element.name} ({element.dot})</li>
			{/each}
		</ul>
	</div>

	<div class="action">
		<select 
			on:change={handleTargetInputChange} 
			value={selectedMergeTargetIndex} 
			data-testid="merger_merge-target"
		>
			<option value={-1} disabled selected>Select a merge target</option>
			{#each items as item, ii}
				<option value={ii}>{item.label}</option>
			{/each}
		</select>
		<Button 
			label="Merge" 
			block={true}
			testid="merger_button-merge" 
			disabled={!isMergePossible}
			on:click={handleMergeClick} 
		/>
	</div>

</merger>
 <style lang="scss">
	merger{
		display:               grid;
		height:                100%;
		grid-template-rows:    2fr auto;
		grid-template-columns: repeat(2, auto) 1fr;
		text-align:            left;
		gap:                   0.5rem;

		ul {
			margin: 0;
			padding: 0;
			list-style-type: none;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}


		.action{
			grid-column:  3 / 4;
			justify-self: left;
			padding:      2rem;
		}

		.structure{
			border-right:       var(--color-black) thin solid;
			display:            grid;
			grid-template-rows: auto 1fr;
			height: 			100%;
			overflow: 			hidden;
		}

		.structure ul{
			height:   100%;
			overflow: auto;
		}

		.list-container{
			border-right:       var(--color-black) thin solid;
			display:            grid;
			height:             100%;
			grid-template-rows: auto auto 1fr;
		}

		.list-container ul {
			height:   100%;
			overflow: auto;
		}

		.list{
			display:        flex;
			flex-direction: column;
			gap:            0.5rem;
		}

		& > div{
			padding: 0.5rem;
		}

		.select-all-container{
			margin-bottom:   1rem;
			display:         flex;
			justify-content: end;
		}

		.action{
			display:        flex;
			flex-direction: row;
			gap:            0.5rem;
			height:         40px;
		}

		.usage{
			height:             100%;
			overflow:           hidden;
			display:            grid;
			grid-template-rows: auto 1fr;
		}

		.usage ul{
			height:   100%;
			overflow: auto;
		}
	}

</style>