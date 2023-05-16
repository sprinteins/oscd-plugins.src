<script lang="ts">
	import {
		ButtonGroup,
		type ButtonGroupOption,
	} from "../../../../components/button-group/"
	import { changeMessageConnectionFilterDirection } from "../../selected-filter-store-functions"

	// Input
	export let disabled: boolean

	type Options = ButtonGroupOption & {
		incoming: boolean,
		outgoing: boolean
	}

	const options: Options[] = [
		{ value: "incoming", label: "Incoming", incoming: true,  outgoing: false },
		{ value: "outgoing", label: "Outgoing", incoming: false, outgoing: true },
		{ value: "both",     label: "Both",     incoming: true,  outgoing: true},
	]


	let selectedIndex = 2
	function handleChange(e: CustomEvent<{ index: number }>) {
		selectedIndex = e.detail.index
		const selectedOption = options[selectedIndex]

		changeMessageConnectionFilterDirection(selectedOption.incoming, selectedOption.outgoing)
	}
</script>

<ButtonGroup
	{options}
	{selectedIndex}
	on:change={handleChange}
	disabled={disabled}
/>

<style>
	/* .connection-type {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		user-select: none;
	}

	.connection-type label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	label input[disabled]+span {
		color: var(--color-text-disabled-1)
	} */
</style>
