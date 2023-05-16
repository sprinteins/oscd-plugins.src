

<script lang="ts">
	import Chip from "@smui/chips"

	export let count: number
	export let max = 100

	$: label = count <= max ? count : `${max-1}+`

</script>

<counter>
	<Chip chip={{}} disabled class="tscd-chip">
		{label}
	</Chip>
</counter>

<style>

	counter :global(.tscd-chip){
		pointer-events: none;
		background-color: var(--mdc-theme-primary);
		color: var(--color-white);
		height: 2rem;
		width: 2rem;
		/* padding: 1rem; */
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>