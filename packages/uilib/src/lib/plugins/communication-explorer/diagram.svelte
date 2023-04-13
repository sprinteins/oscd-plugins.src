<script lang="ts">
	import type { ElkNode } from "elkjs/lib/elk-api";
	import IED from "./ied.svelte"
	import Message from "./message.svelte"
	// import "./ied.svelte"
	// import "./message.svelte"
	
	const ZOOM_WIDTH = 3
	const ZOOM_HEIGHT = 3

	const WIDTH = 900
	const HEIGHT = 300
	
	// 
	// Inputs
	// 
	export let rootNode: ElkNode
	export let nodeWidth: number
	export let nodeHeight: number


</script>
<svelte:options tag="tscd-diagram" />

{#if rootNode}
<diagram>
	<!-- <svg viewBox={`0 0 ${rootNode.width*ZOOM_WIDTH} ${rootNode.height*ZOOM_HEIGHT}`} xmlns="http://www.w3.org/2000/svg"> -->
	<svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
		{#if rootNode.children }
		{#each rootNode.children as node}
			<foreignObject x={node.x} y={node.y} width={nodeWidth} height={nodeHeight}>
				<IED node={node} width={nodeWidth} height={nodeHeight} />
			</foreignObject>
		{/each}
		{/if}

		{#if rootNode.edges}
		{#each rootNode.edges as edge}
			<Message edge={edge} />
		{/each}
		{/if}
	</svg>
</diagram>
{/if}

<style>
	
</style>