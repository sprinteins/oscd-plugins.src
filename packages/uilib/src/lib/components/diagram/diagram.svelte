

<script lang="ts">
	import type { IEDConnectionWithCustomValues, IEDNode, RootNode } from "./nodes"
	import { IEDElement } from "./ied-element"
	import Message from "./message.svelte"
	import { createEventDispatcher } from "svelte"
	import type { ElkExtendedEdge } from "elkjs"
	import { isConnectionSelected, isIEDSelected } from "../../plugins/communication-explorer/_store-view-filter"

	//
	// Inputs
	//
	export let rootNode: RootNode
	export let playAnimation = true
	export let showConnectionArrows = true

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

	function isConnectionsAnyIEDSelected(connection: IEDConnectionWithCustomValues): boolean{
		return isIEDSelected({label: connection.sourceIED.iedName} ) || isIEDSelected({label: connection.targetIED.iedName} )
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
						<IEDElement 
							{node} 
							isSelected={isIEDSelected(node)} 
							testid={`ied-${node.label}`}
						/>
					</foreignObject>
				{/each}
			{/if}

			{#if rootNode.edges}
				{#each rootNode.edges as edge}
					<Message
						{edge}
						isSelected={isConnectionSelected(edge)}
						isIEDSelected={ isConnectionsAnyIEDSelected(edge) }
						on:click={() => dispatchConnectionClick(edge)}
						testid={`connection-${edge.id}`}
						playAnimation={playAnimation}
						showConnectionArrows={showConnectionArrows}
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