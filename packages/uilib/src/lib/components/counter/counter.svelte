<svelte:options tag="tscd-counter" />

<script lang="ts">
	import css from "./counter.scss?inline"

	export let count: number
	export let max = 100

</script>

<counter>
	{#if count <= max}
		{count}
	{:else}
		{max-1}+
	{/if}
</counter>

<svelte:element this="style">{@html css}</svelte:element>