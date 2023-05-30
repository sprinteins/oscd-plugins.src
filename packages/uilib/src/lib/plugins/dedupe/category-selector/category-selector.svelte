<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Chip from "../../../components/chip/chip.svelte"
	import {
		type ChipContents,
		type ChipSelectedEventValue,
		newChipContentFromCategories,
	} from "../../../components/chip"
	import type { ChipElementCategories } from "./categories"

	// Input
	export let categories: ChipElementCategories
	let chipCategories: ChipContents
	let preselectedIdentifier = ""

	// convert data to chip data
	$: chipCategories = convertCategories2Chip(categories)
	function convertCategories2Chip(
		categories: ChipElementCategories
	): ChipContents {
		let chips: ChipContents = []
		categories.forEach((category) => {
			chips.push(newChipContentFromCategories(category))
		})
		return chips
	}

	// when data gets refreshed, select the first category with data in it
	$: selectFirstCategoryWithData(categories)
	function selectFirstCategoryWithData(
		dataCategories: ChipElementCategories
	) {
		dataCategories.forEach((category) => {
			if (category) {
				preselectedIdentifier = category.identifier
				return
			}
		})
	}

	// Internal
	const dispatchEvent = createEventDispatcher()
	function dispatchSelectEvent(data: CustomEvent<{ selected: string[] }>) {
		dispatchEvent("select", { selection: data.detail.selected })
	}
</script>

<Chip
	on:selectedUpdate={dispatchSelectEvent}
	chips={chipCategories}
	selectedChipIdentifier={[preselectedIdentifier]}
/>
