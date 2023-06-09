

<script lang="ts">
	import type { IEDNode, RootNode } from "./nodes"
	import { IEDElement } from "./ied-element"
	import Message from "./message.svelte"
	import { createEventDispatcher } from "svelte"
	import type { ElkExtendedEdge } from "elkjs"

	//
	// Inputs
	//
	export let rootNode: RootNode
	export let selectedIedIDs: string[] = []
	export let selectedConnectionID: string | undefined = undefined

	//
	// Setup
	//

	let svgRoot: SVGElement

	const dispatch = createEventDispatcher()
	function handleIEDClick(e: MouseEvent, node: IEDNode) {
		const isAdditiveSelect = e.metaKey || e.ctrlKey || e.shiftKey
		if(isAdditiveSelect){
			dispatchIEDAdditiveSelect(node)
			return
		}

		dispatchIEDSelect(node)
	}
	function dispatchIEDSelect(node: IEDNode) {
		dispatch("iedselect", node)
	}
	function dispatchIEDAdditiveSelect(node: IEDNode) {
		dispatch("iedadditiveselect", node)
	}

	function dispatchConnectionClick(connection: ElkExtendedEdge) {
		dispatch("connectionclick", connection)
	}

	function handleSVGClick(e: Event){
		if(e.target !== svgRoot){ return }
		
		dispatch("clearclick")
	}

</script>

{#if rootNode}
	<diagram>
		<svg
			bind:this={svgRoot}
			viewBox={`0 0 ${rootNode.width} ${rootNode.height}`}
			style={`--width:${rootNode.width}px; --height:${rootNode.height}`}
			xmlns="http://www.w3.org/2000/svg"
			on:click={handleSVGClick}
			on:keypress
		>
			{#if rootNode.children}
				{#each rootNode.children as node}
					<foreignObject
						x={node.x}
						y={node.y}
						width={node.width}
						height={node.height}
						on:click={(e) => handleIEDClick(e,node)}
						on:keydown
					>
						<!-- <IEDElement {node} isSelected={node.id === selectedIedIDs} /> -->
						<IEDElement {node} isSelected={selectedIedIDs.includes(node.id)} />
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