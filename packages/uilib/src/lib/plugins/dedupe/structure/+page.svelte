<script lang="ts">
	import Example from "../../../components/internal/example/example.svelte"
	import type { Item } from "./item"
	import { Structure } from "."
	
	let items: Item[] = [
		{ label: "stv", type: "int" }
	]

</script>

<Example name="Structure">
	<div class="container">
		<Structure 
			{items}
		/>
	</div>
</Example>

<style>
	.container{
		width: 200px;
	}
</style>