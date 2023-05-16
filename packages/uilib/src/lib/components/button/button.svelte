
<script lang="ts">
	import Button, { Label } from "@smui/button"

	// Input
	export let testid = ""
	export let disabled = false
	export let type: "primary" | "secondary" | "tertiary" = "primary"

	type Variant = "text" | "raised" | "unelevated" | "outlined"
	const varianTypeMap: {[key in typeof type]: Variant} = {
		"primary":   "raised",
		"secondary": "outlined",
		"tertiary":  "text",
	}

	$: dataProps = {
		"data-testid": testid
	}
	

</script>
<Button
	class="tscd-button"
	on:click 
	{disabled}
	variant={varianTypeMap[type]} 
	{...dataProps}
>
	<Label>
		<slot />
	</Label>
</Button>

<style lang="scss">

	/* 
		There are css variables for button theming in theme.svelte 
	*/

	/* 
		We need the extra `button` selector
		to have a higher score then the original styles
	 */
	:global(button.tscd-button){
		--padding: 0.5rem;
		width:  auto;
		height:  auto;
		padding: var(--padding) calc(var(--padding) * 2);
	}
</style>