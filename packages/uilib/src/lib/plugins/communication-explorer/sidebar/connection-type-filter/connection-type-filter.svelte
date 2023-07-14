<script lang="ts">
	import FilterChip from "../../../../components/filter-chip/filter-chip.svelte"
	import { changeMessageConnectionFilterDirection } from "../../_store-view-filter"
	export let disabled = false
	export let isFilterIncomingActive = false
	export let isFilterOutgoingActive = false

	function handleClickOnPublisher() {
		changeMessageConnectionFilterDirection(
			!isFilterIncomingActive,
			isFilterOutgoingActive
		)
	}

	function handleClickOnSubscriber() {
		changeMessageConnectionFilterDirection(
			isFilterIncomingActive,
			!isFilterOutgoingActive
		)
	}
</script>

<div class="ButtonGroup">
	<FilterChip
		label={"Published"}
		{disabled}
		isSelected={isFilterIncomingActive}
		on:click={handleClickOnPublisher}
	/>
	<FilterChip
		label={"Subscribed"}
		{disabled}
		isSelected={isFilterOutgoingActive}
		on:click={handleClickOnSubscriber}
	/>
</div>

<style>
	:global(.ButtonGroup) {
		border-radius: 1rem;
		margin-left: -13rem;
	}
</style>
