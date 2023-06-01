<script lang="ts">
  import Chip from "@smui/chips/src/Chip.svelte"
  import Set from "@smui/chips/src/Set.svelte"
  import { Label } from "@smui/common"
  import { createEventDispatcher } from "svelte"
  import { changeMessageConnectionFilterDirection } from "../../plugins/communication-explorer/_store-view-filter"
  import Text from "@smui/chips/src/Text.svelte"

  type Options = {
    value: string;
    label: string;
    incoming: boolean;
    outgoing: boolean;
  };

  export let selected = 2
  export const options: Options[] = []

  function handleChange(e: CustomEvent<{ index: number }>) {
  	selected = e.detail.index
  	const selectedOption = options[selected]

  	changeMessageConnectionFilterDirection(
  		selectedOption.incoming,
  		selectedOption.outgoing
  	)
  }
</script>

<chips class="Chips">
  <Set
    chips={options}
    let:chip
    choice
    bind:selected
    on:bind={handleChange}
    class="ChipsOptions"
  >
    <Chip {chip}>
      <Text>{chip.label}</Text>
    </Chip>
  </Set>
</chips>

<style lang="scss">
  :global(.Chips) {
    display: flex;
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
  :global(.Chips) {
    padding-left: 5rem;
  }
</style>
