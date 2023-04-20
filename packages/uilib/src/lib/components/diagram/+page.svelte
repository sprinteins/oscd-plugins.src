<script lang="ts">
    import { Example } from "$lib/components/internal"
	import { Diagram} from "."
  	import { generateMockRootNode } from "../../mocks/root-node";

	const nodes = generateMockRootNode()
	

</script>

<Example name="Diagram">
	<div class="container">
		{#await nodes then nodes}
			<Diagram rootNode={nodes} />
		{/await}
	</div>
</Example>

<style>
	.container {
		width: 1000px;
		height: 600px;
		border: grey solid thin;
	}
</style>