<script lang="ts">
	import { Button } from "../../../components/button"
	// import { Checkbox } from "../../../components/checkbox"
	import { createEventDispatcher } from "svelte"
	import type {
		EventDetailRelink,
		EventDetailTypeLinkerSelect,
	} from "./events"
	import List, { Item, Meta, Label, Graphic } from "@smui/list"
	import Checkbox from "@smui/checkbox"

	// Import
	export let items: { label: string }[] = []
	export let testid = "type-linker"

	// Internal
	const dispatch = createEventDispatcher()
	let selectedLinkTargetIndex = -1

	$: isTargetSelected = selectedLinkTargetIndex > -1
	$: isSomeDuplicateSelected = selected.length > 0
	$: isMergePossible = isSomeDuplicateSelected && isTargetSelected
	let checkedIndexes: Set<number> = new Set()
	$: {
		const detail: EventDetailTypeLinkerSelect = {
			indexes: selected,
		}
		dispatch("select", detail)
	}

	function handleSelectAll(e: Event) {
		items.forEach((_, index) => checkedIndexes.add(index))
		checkedIndexes = checkedIndexes
		selected = Array(items.length)
			.fill(true)
			.map((_, i) => i)
	}

	function handleSourceChange(index: number, e: Event) {
		const input = e.target as HTMLInputElement
		if (input.checked) {
			checkedIndexes.add(index)
		} else {
			checkedIndexes.delete(index)
		}
		checkedIndexes = checkedIndexes
	}

	function handleTargetInputChange(e: Event) {
		const input = e.target as HTMLInputElement
		const value = input.value
		const index = parseInt(value)

		selectedLinkTargetIndex = index
	}

	function handleRelink(e: Event): void {
		if (!isMergePossible) {
			return
		}
		const detail: EventDetailRelink = {
			sourceIndexes: selected,
			targetIndex:   selectedLinkTargetIndex,
		}
		dispatch("relink", detail)
	}

	let selected: number[] = []

	function handleSelectionChange(
		e: CustomEvent<{ changedIndices: number[] }>
	) {
		const { changedIndices } = e.detail
	}
</script>

<type-linker data-testid={testid}>
	<label>
		<span>Relink to:</span>
		<select
			on:change={handleTargetInputChange}
			value={selectedLinkTargetIndex}
			data-testid="merger_merge-target"
		>
			<option value={-1} disabled selected>Select a relink target</option>
			{#each items as item, ii}
				<option value={ii}>{item.label}</option>
			{/each}
		</select>
	</label>

	<div class="select-all-container">
		<Button
			testid="merger_select-all"
			type="tertiary"
			on:click={handleSelectAll}
		>
			Select All
		</Button>
	</div>

	<!-- <ul class="list">
		{#each items as item, ii}
			<li>
				<Checkbox 
					checked={checkedIndexes.has(ii)} 
					label={item.label} 
					on:change={e => handleSourceChange(ii, e)}
					testid={`merger_checkbox-${ii}`}
				/>
			</li>
		{/each}
	</ul> -->

	<List
		class="type-linker__list"
		checkList
		on:SMUIList:selectionChange={handleSelectionChange}
	>
		{#each items as item, ii}
			<Item>
				<Graphic>
					<Checkbox
						bind:group={selected}
						value={ii}
						checked={checkedIndexes.has(ii)}
						label={item.label}
					/>
				</Graphic>
				<Label>
					{item.label}
				</Label>
			</Item>
		{/each}
	</List>

	<div class="action">
		<Button
			testid="merger_button-merge"
			disabled={!isMergePossible}
			on:click={handleRelink}
		>
			Relink
		</Button>
	</div>
</type-linker>

<style>
	type-linker {
		height: calc(100% - 1rem);
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		gap: 1rem;
		overflow: hidden;
	}
	select {
		height: 3rem;
	}
	label {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	type-linker :global(.type-linker__list) {
		overflow: auto;
		overflow-x: hidden;
	}

	.action {
		display: flex;
		justify-content: flex-end;
	}
</style>
