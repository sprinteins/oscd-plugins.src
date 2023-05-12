

<script lang="ts">
	import { Counter } from "../../../components/counter"
	import css from "./group-card.scss?inline"

	// Input
	export let items: string[] = []
	export let dataTestid = ""
	export let selected = false

	// Config
	const MAX_NR_OF_ITEMS = 3
	$: displayedItems = items.slice(0, MAX_NR_OF_ITEMS)
	$: titleText = items.join("\n")


</script>

<group-card 
	on:click 
	on:keypress 
	data-testid={dataTestid} 
	class:selected 
	title={titleText}
>
	<div class="left">
	<ul>
		{#each displayedItems as item}
			<li>{item}</li>
		{/each}
	</ul>
	</div>
	<div class="right">
		<Counter count={items.length} />
	</div>
</group-card>

<svelte:element this="style">{@html css}</svelte:element>