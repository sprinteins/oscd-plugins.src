<script lang="ts">
	import { writable } from 'svelte/store'
	import {
	  SvelteFlow,
	  Controls,
	  Background,
	  BackgroundVariant,
	  MiniMap,
	  type NodeTypes,
	  type Node,
	  type Edge
	} from "@xyflow/svelte"
	import { initialNodes, initialEdges } from './nodes-and-edges'
	import "@xyflow/svelte/dist/style.css"
  
	// 
	// Input
	// 
	export let nodes: Node[] = []
	export let edges: Edge[] = []
	
	const nodes$ = writable<Node[]>(nodes)
	const edges$ = writable<Edge[]>(edges)
</script>
  
<main>
<SvelteFlow nodes={nodes$} edges={edges$} fitView minZoom={0.1} maxZoom={2.5}>
	<Controls />
	<Background variant={BackgroundVariant.Dots} />
	<MiniMap />
</SvelteFlow>
</main>

<style>
main {
	height: 100vh;
}

:global(.svelte-flow .svelte-flow__node.parent) {
	background-color: rgba(220, 220, 255, 0.4);
}
</style>