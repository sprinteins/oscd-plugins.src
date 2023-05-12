

<script lang="ts">
	import css from "./checkbox.scss?inline"

	export let checked = false
	export let label: string
	export let testid = ""

</script>

<checkbox data-testid={testid}>
	<label>
		<input type="checkbox" on:change on:input bind:checked={checked}  />
		<span>{label}</span>
	</label>
</checkbox>

<svelte:element this="style">{@html css}</svelte:element>