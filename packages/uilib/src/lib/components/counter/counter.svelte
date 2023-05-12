

<script lang="ts">
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

<style>

	counter{
		display: 	   inline;
		background:    var(--color-blue-dark);
		color: 	       var(--color-white-dark);
		padding: 	   0 0.25rem;
		border-radius: 2rem;
		line-height:   18px;
		min-width:     20px;
	}
</style>