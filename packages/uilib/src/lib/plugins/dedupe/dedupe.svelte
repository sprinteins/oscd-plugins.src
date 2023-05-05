<svelte:options tag="tscd-dedupe" />
<script lang="ts">
	export let root: Element
	
</script>

<network-explorer>
	<h1>Hi I am the Dedupe Plugin</h1>
	<p>got document?</p>
	{#if root}
		<span>yes</span>
	{:else}
		<span>no</span>
	{/if}
</network-explorer>