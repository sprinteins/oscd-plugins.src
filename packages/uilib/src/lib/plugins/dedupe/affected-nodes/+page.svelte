<script lang="ts">
	import Example from "../../../components/internal/example/example.svelte"
	import { AffectedNodes, type Item } from "."

	let items: Item[] = [
		{ elementId: "a1", elementType: "dOIcon", usedElementId: "b1"}
	]

</script>

<Example name="Affected Nodes">
	<div class="container">
		<AffectedNodes 
			{items}
		/>
	</div>
</Example>

<style>
	.container{
		width: 200px;
	}
</style>