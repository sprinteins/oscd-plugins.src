<script lang="ts">
	import { type Node, type Edge, SvelteFlow, Background, BackgroundVariant, Controls, MiniMap } from "@xyflow/svelte"
	import '@xyflow/svelte/dist/style.css';

    import { writable } from "svelte/store";

	export let nodes: Node[] = []
	export let edges: Edge[] = []
	
 	const nodes$ = writable<Node[]>(nodes)
	const edges$ = writable<Edge[]>(edges)
</script>

<network-diagram>
	<SvelteFlow nodes={nodes$} edges={edges$} fitView minZoom={0.1} maxZoom={2.5}>
		<Controls />
		<Background variant={BackgroundVariant.Dots} />
		<MiniMap />
	</SvelteFlow>
</network-diagram>

<style>
	network-diagram {
		display: block;
		height: 100vh;
	}
	
	:global(.svelte-flow .svelte-flow__node.parent) {
		background-color: rgba(220, 220, 255, 0.4);
	}
	</style>