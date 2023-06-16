<script lang="ts">
  import { Example } from "../internal"
  import type { ButtonGroupOption } from "../button-group"
  import FilterChip from "./filter-chip.svelte"

  let clicked = false
  function handleClick() {
  	console.log("clicked")
  	clicked = true
  }
  console.log(clicked)

  type Options = ButtonGroupOption & {
    incoming: boolean;
    outgoing: boolean;
  };

  const options: Options[] = [
  	{
  		id:       "incoming",
  		label:    "Publishers",
  		incoming: true,
  		outgoing: false,
  	},
  	{
  		// eslint-disable-next-line key-spacing
  		id: "outgoing",
  		label:    "Subscribers",
  		incoming: false,
  		outgoing: true,
  	},
  	// { value: "both", label: "Both", incoming: true, outgoing: true },
  ]
  let disabled = false
</script>

<h1>Chips</h1>

<Example name="Primary">
  {#each options as chipOption}
    <FilterChip
      {chipOption}
      {disabled}
      on:click={handleClick}
      testid="button-primary"
    />
  {/each}
</Example>
