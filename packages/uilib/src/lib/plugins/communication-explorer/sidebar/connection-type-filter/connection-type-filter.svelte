<script lang="ts">
	import FilterChip from "../../../../components/filter-chip/filter-chip.svelte"
	import { changeMessageConnectionFilterDirection } from "../../_store-view-filter"

	export let disabled = false

	let uiInc = false
	let uiOut = false

	function handleClickOnPublisher() {
		calculateState(!uiInc, uiOut)
	}

	function handleClickOnSubscriber() {
		calculateState(uiInc, !uiOut)
	}

	function calculateState(inc: boolean, out: boolean) {
		uiInc = inc
		uiOut = out

		let incoming = true
		let outgoing = true

		if (inc || out) {
			incoming = inc
			outgoing = out
		}

		if (!inc && !out) {
			incoming = true
			outgoing = true
		}
		changeMessageConnectionFilterDirection(incoming, outgoing)
	}

	calculateState(uiInc, uiOut)
</script>

<div class="ButtonGroup">
	<FilterChip
		label={"Published"}
		{disabled}
		isSelected={uiInc}
		on:click={handleClickOnPublisher}
	/>
	<FilterChip
		label={"Subscribed"}
		{disabled}
		isSelected={uiOut}
		on:click={handleClickOnSubscriber}
	/>
</div>

<style>
	:global(.ButtonGroup) {
		border-radius: 1rem;
		margin-left: -13rem;
	}
</style>
