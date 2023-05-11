<svelte:options tag="tscd-button" />
<script lang="ts">

	import css from "./button.scss?inline"

	// Input
	export let block = false
	export let dangerous = false
	export let label: string
	export let testid = ""
	export let disabled = false
	export let type: "primary" | "secondary" | "tertiary" = "primary"

</script>

<button
	class:block
	class:dangerous
	class={`tscd-button ${type}`}
	{disabled}
	on:click
	data-testid={testid}
>
	{label}
</button>

<svelte:element this="style">{@html css}</svelte:element>