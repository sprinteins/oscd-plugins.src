<script lang="ts">
	import { Button } from "../../../components/button"
	import { createEventDispatcher } from "svelte"
	import List, { Item, Meta, Label, Graphic } from "@smui/list"
	import Checkbox from "@smui/checkbox"
	import { Select } from "../../../components/select"
	import type { EventDetailRelink, EventDetailTypeLinkerSelect } from "../../type-switcher/type-linker/events"

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

	function handleTargetInputChange(e: CustomEvent<{ index: number }>) {
		const index = e.detail.index
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
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		<span class="choose-link">Type to switch to:</span>
		<div class="select-menu">
			<Select
				on:select={handleTargetInputChange}
				linkTargetIndex={selectedLinkTargetIndex}
				{items}
			>
				<option value={-1} disabled selected />
				<!-- <option value={-1} disabled selected>{item.label}</option> -->
				{#each items as item, index}
					<option value={index}>{item.label}</option>
				{/each}
			</Select>
		</div>
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

	<List
		class="type-linker__list"
		checkList
		on:SMUIList:selectionChange={handleSelectionChange}
	>
		{#each items as item, ii}
			<Item class="item-typeswitcher-selected">
				<Graphic>
					<Checkbox
						bind:group={selected}
						value={ii}
						checked={checkedIndexes.has(ii)}
						label={item.label}
					/>
				</Graphic>
				<Label class="label-type-linker">
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
			switch
		</Button>
	</div>
</type-linker>

<style lang="scss">
	type-linker {
		height: calc(100% - 1rem);
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		gap: 1rem;
		overflow: hidden;
	}

	label {
		display: flex;
		flex-direction: column;
		overflow: visible;
	}
	type-linker :global(.type-linker__list) {
		overflow: auto;
		overflow-x: hidden;
	}

	:global(.label-type-linker) {
		margin-left: -2rem;
	}
	.choose-link {
		font-size: var(--font-size-small);
		margin-bottom: 0.25rem;
		margin-left: 1rem;
	}

	.action {
		display: flex;
		justify-content: flex-end;
		margin-right: 0.5rem;
	}
	:global(.item-typeswitcher-selected) {
		margin-bottom: -0.5rem;
	}
	.select-menu {
		margin-right: 0.5rem;
		margin-left: 0.5rem;
	}
</style>
