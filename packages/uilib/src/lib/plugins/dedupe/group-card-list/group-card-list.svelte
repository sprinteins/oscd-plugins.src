<svelte:options tag="tscd-group-card-list" />

<script lang="ts">
	import { GroupCard } from "../group-card/"
	import css from "./group-card-list.scss?inline"
	import {createEventDispatcher} from "svelte"

	// Input
	export let itemSets: string[][] = []
	export let selectedIndex = -1

	// Config
	const dispatch = createEventDispatcher()

	function handleClick(index: number){
		dispatch("select", {index})
	}

</script>

<group-card-list>
	{#each itemSets as itemSet, ii }
		<GroupCard 
			items={itemSet} 
			on:click={() => handleClick(ii)}
			dataTestid={`card_${ii}`}
			selected={selectedIndex === ii}
		/>
	{/each}
</group-card-list>

<svelte:element this="style">{@html css}</svelte:element>
