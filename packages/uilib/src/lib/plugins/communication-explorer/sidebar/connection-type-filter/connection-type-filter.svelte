<script lang="ts">
	import { ButtonGroup } from "../../../../components/button-group/"
	import { handleChange, options } from "./"

	// Input
	export let disabled: boolean
	let selectedIndex = 2
</script>

<ButtonGroup
	{options}
	{selectedIndex}
	on:change={(e) => (selectedIndex = handleChange(e))}
	{disabled}
/>

<style>
</style>
