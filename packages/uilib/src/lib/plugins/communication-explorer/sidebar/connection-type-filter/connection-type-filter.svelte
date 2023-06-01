<script lang="ts">
  import Text from "@smui/chips/src/Text.svelte"
  import {
  	ButtonGroup,
  	type ButtonGroupOption,
  } from "../../../../components/button-group/"
  import { changeMessageConnectionFilterDirection } from "../../selected-filter-store-functions"
  import Chip, { Set } from "@smui/chips"

  // Input
  export let disabled: boolean

  type Options = ButtonGroupOption & {
    incoming: boolean;
    outgoing: boolean;
  };

  //   const options: Options[] = [
  //     { value: "incoming", label: "Incoming", incoming: true, outgoing: false },
  //     { value: "outgoing", label: "Outgoing", incoming: false, outgoing: true },
  //     { value: "both", label: "Both", incoming: true, outgoing: true },
  //   ];
  const options: Options[] = [
  	{ value: "incoming", label: "Publisher", incoming: true, outgoing: false },
  	{
  		value:    "outgoing",
  		label:    "Subscribers",
  		incoming: false,
  		outgoing: true,
  	},
  ]

  let selected = 2

  //let selectedIndex = 2;

  function handleChange(e: CustomEvent<{ index: number }>) {
  	selected = e.detail.index
  	const selectedOption = options[selected]

  	changeMessageConnectionFilterDirection(
  		selectedOption.incoming,
  		selectedOption.outgoing
  	)
  }
</script>

<!-- <ButtonGroup {options} {selectedIndex} on:change={handleChange} {disabled} /> -->

<Set
  chips={options}
  let:chip
  choice
  bind:selected
  on:bind={handleChange}
  class="ChipsOptions"
  {disabled}
>
  <Chip {chip}>
    <Text>{chip.label}</Text>
  </Chip>
</Set>

<style>
  :global(.ChipsOptions) {
    display: flex;
    margin-left: -18rem;
  }

  :global(.mdc-chip--selected) {
    outline: 1px var(--mdc-theme-primary) solid;
    color: var(--mdc-theme-primary);
  }

  :global(.mdc-chip) {
    height: 0;
    padding: 0.75rem 1rem;
    background-color: var(--mdc-theme-surface);
  }

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
