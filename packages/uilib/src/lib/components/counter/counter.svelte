

<script lang="ts">
	export let count: number
	export let max = 10

	$: label = count <= max ? count : `${max-1}+`

</script>

<counter>
	<div>
		{label}
	</div>
</counter>

<style>

	counter{
		pointer-events: none;
		background-color: var(--mdc-theme-primary);
		color: var(--color-white);
		border-radius: 2rem;
		height: 1.75rem;
		width:  1.75rem;
		font-size: 1rem;
		display: inline-grid;
		place-items: center;
	}
</style>