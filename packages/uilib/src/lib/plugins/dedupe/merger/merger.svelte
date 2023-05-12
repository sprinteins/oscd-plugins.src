
<script lang="ts">

	import { Button } from "../../../components/button"
	import Checkbox from "../../../components/checkbox/checkbox.svelte"
	import type { MergableItem } from "./mergable-items"
	import css from "./merger.scss?inline"
	import { createEventDispatcher } from "svelte"

	// Input
	export let items: MergableItem[] = []
	export let structure: string[] = []
	// Setup
	const dispatch = createEventDispatcher()

	// Actions
	let checkedIndexes: Set<number> = new Set()
	let affectedLNTypes: {ln: string, dot: string}[] = []
	// let checkedIndexes = new Map<number, boolean>()
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

	function generateAffectedLNTypes(indexes: number[]){
		const newAffectedLNTypes = []
		for(const index of indexes){
			const item = items[index]
			const usages = item.usages
			for( const ln of usages){
				newAffectedLNTypes.push({ln, dot: item.label})
			}
		}
		return newAffectedLNTypes
	}
	$: affectedLNTypes = generateAffectedLNTypes([...checkedIndexes.values()])


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
		<h3>Affected LN Types</h3>
		<ul>
			{#each affectedLNTypes as lnType}
				<li>{lnType.ln} ({lnType.dot})</li>
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

<svelte:element this="style">{@html css}</svelte:element>