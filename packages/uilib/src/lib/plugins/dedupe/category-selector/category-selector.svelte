<script lang="ts">
	/**
	 * Note:
	 * Currently we are binding the `selected` property, but
	 * I am not big fan of this approach. I would prefer
	 * to have a `selected` event that we can listen to
	 * and then update the `selected` property.
	*/
	import Chip, { Set, Text } from "@smui/chips"
	import { createEventDispatcher } from "svelte"
	import type { ElementCategory } from "./categories"
	import type { EventDetailCategorySelect } from "./event-detail"


	// Input
	export let testid = ""
	export let labels: string[]

	// Internal
	const dispatch = createEventDispatcher()
	let selected: (ElementCategory|null)[] = []
	$: {
		// We filter out `null` but typescript does not know that so we cast
		const newSelection = selected.filter(Boolean) as ElementCategory[]
		const indexes = newSelection.map( el => labels.indexOf(el))
		const details: EventDetailCategorySelect = {selection: indexes}
		dispatch("select", details)
	}

	
	function dataTestid(id: string){
		return {"data-testid": id}
	}
	
	function chipTestid(rootTestId: string, label: string){
		return `${rootTestId}_${label}`
	}

</script>


<category-selector>
	{#each labels as label, ci}
	<Set chips={[label]} let:chip choice bind:selected={selected[ci]}>
			<Chip 
				chip={chip}
				{...dataTestid(chipTestid(testid, chip))}
			>
				<Text>{chip}</Text>
			</Chip>
		</Set>
	{/each}
</category-selector>

<style lang="scss">
	
	category-selector {
		:global(.mdc-chip) {
			height: 0;
			padding: 0.75rem 1rem;
			background-color: var(--mdc-theme-surface);
		}

		:global(.mdc-chip--selected){
			outline: 1px var(--mdc-theme-primary) solid;
			color: var(--mdc-theme-primary)
		}

		:global(.mdc-chip-set) {
			display: inline-block;
			padding: 0;
			margin: 0;
		}
	}

</style>