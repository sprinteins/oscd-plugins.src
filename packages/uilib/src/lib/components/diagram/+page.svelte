<script lang="ts">
	import { Diagram } from "."
	import { generateMockRootNode } from "../../mocks/root-node"
	import { Example } from "../internal"

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
