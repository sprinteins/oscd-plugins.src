

<script lang="ts">
	import type { IEDNode, RootNode } from "./nodes"
	import IED from "./ied.svelte"
	import Message from "./message.svelte"
	import { createEventDispatcher } from "svelte"
	import type { ElkExtendedEdge } from "elkjs"

	//
	// Inputs
	//
	export let rootNode: RootNode
	export let selectedIedID: string | undefined = undefined
	export let selectedConnectionID: string | undefined = undefined

	//
	// Setup
	//
	const dispatch = createEventDispatcher()
	function dispatchIEDClick(node: IEDNode) {
		dispatch("iedclick", node)
	}
	function dispatchConnectionClick(connection: ElkExtendedEdge) {
		dispatch("connectionclick", connection)
	}
</script>

{#if rootNode}
	<diagram>
		<svg
			viewBox={`0 0 ${rootNode.width} ${rootNode.height}`}
			style={`--width:${rootNode.width}px; --height:${rootNode.height}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			{#if rootNode.children}
				{#each rootNode.children as node}
					<foreignObject
						x={node.x}
						y={node.y}
						width={node.width}
						height={node.height}
						on:click={() => dispatchIEDClick(node)}
						on:keydown
					>
						<IED {node} isSelected={node.id === selectedIedID} />
					</foreignObject>
				{/each}
			{/if}

			{#if rootNode.edges}
				{#each rootNode.edges as edge}
					<Message
						{edge}
						isSelected={selectedConnectionID === edge?.id}
						on:click={() => dispatchConnectionClick(edge)}
					/>
				{/each}
			{/if}
		</svg>
	</diagram>
{/if}

<style>
	diagram {
		display:  block;
		width: 	  100%;
		height:   100%;
		overflow: auto;
	}

	svg {
		width:  var(--width);
		height: var(--height);
	}
</style>