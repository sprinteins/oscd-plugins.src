<script lang="ts">
  import { Example } from "../internal"
  import { Chips } from "."
  import type { Options } from "../../plugins/communication-explorer/sidebar/connection-type-filter"
  import { changeMessageConnectionFilterDirection } from "../../plugins/communication-explorer/_store-view-filter"
  import Set from "@smui/chips/src/Set.svelte"
  import Chip from "@smui/chips/src/Chip.svelte"
  import Text from "@smui/chips/src/Text.svelte"

  const options: Options[] = [
  	{ value: "Apfel", label: "Apfel", incoming: true, outgoing: false },
  ]
  let selected = 1

  function handleChange(e: CustomEvent<{ index: number }>) {
  	selected = e.detail.index
  	const selectedOption = options[selected]

  	changeMessageConnectionFilterDirection(
  		selectedOption.incoming,
  		selectedOption.outgoing
  	)
  }
</script>

<h1>This is how the Chip component looks like</h1>

<Example name="Chip">
  <div>
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
  </div>
</Example>
