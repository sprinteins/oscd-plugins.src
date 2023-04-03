<script lang="ts">
	import type { ElkNode } from "elkjs/lib/elk-api";
	import IED from "./ied.svelte"
	
	const ZOOM_WIDTH = 5
	const ZOOM_HEIGHT = 5
	
	// 
	// Inputs
	// 
	export let rootNode: ElkNode
	export let nodeWidth: number
	export let nodeHeight: number


</script>

<diagram>
	<svg viewBox={`0 0 ${rootNode.width*ZOOM_WIDTH} ${rootNode.height*ZOOM_HEIGHT}`} xmlns="http://www.w3.org/2000/svg">
		{#if rootNode.children }
		{#each rootNode.children as node}
			<foreignObject x={node.x} y={node.y} width={nodeWidth} height={nodeHeight}>
				<IED node={node} width={nodeWidth} height={nodeHeight} />
			</foreignObject>
		{/each}
		{/if}
	</svg>
</diagram>


<style>
	
</style>