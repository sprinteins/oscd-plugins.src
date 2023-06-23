

<script lang="ts">
	import type { IEDConnectionWithCustomValues, IEDNode, RootNode } from "./nodes"
	import { IEDElement } from "./ied-element"
	import Message from "./message.svelte"
	import { createEventDispatcher } from "svelte"
	import type { ElkExtendedEdge } from "elkjs"
	import { isConnectionSelected, isIEDSelected } from "../../plugins/communication-explorer/_store-view-filter"
import type { Mouse } from "@playwright/test"

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
	let root: HTMLElement

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

	function handleClick(e: Event){
		if(e.target !== svgRoot && e.target !== root){ return }
		
		if(isDragging){
			isDragging = false
			draggingEnabled = false
			return
		}
		if(draggingEnabled){
			isDragging = false
			draggingEnabled = false
		}
		
		dispatch("clearclick")
	}

	function isConnectionsAnyIEDSelected(connection: IEDConnectionWithCustomValues): boolean{
		return isIEDSelected({label: connection.sourceIED.iedName} ) || isIEDSelected({label: connection.targetIED.iedName} )
	}

	// 
	// Draggable Diagram
	// 
	let pos = { top: 0, left: 0, x: 0, y: 0 }
	let draggingEnabled = false
	let isDragging = false
	function handleMouseDown(e: MouseEvent){
		if(e.target !== svgRoot && e.target !== root){ return }

		draggingEnabled = true
		pos = {
			// The current scroll
			left: root.scrollLeft,
			top:  root.scrollTop,
			// Get the current mouse position
			x:    e.clientX,
			y:    e.clientY,
		}
	}
	function handleMouseMove(e: MouseEvent){
		if(!draggingEnabled){ return }
		isDragging = true
		// How far the mouse has been moved
		const dx = e.clientX - pos.x
		const dy = e.clientY - pos.y

		// Scroll the element
		root.scrollTop = pos.top - dy
		root.scrollLeft = pos.left - dx
	}

	function handleMouseLeave(e: MouseEvent){
		isDragging = false
		draggingEnabled = false
	}

</script>

{#if rootNode}
	<diagram
		bind:this={root} 
		on:click={handleClick} 
		on:keypress
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseleave={handleMouseLeave}
		class:isDragging

	>
		<svg
			bind:this={svgRoot}
			on:keypress
			viewBox={`0 0 ${rootNode.width} ${rootNode.height}`}
			style:--width={`${rootNode.width}px`}
			style:--height={`${rootNode.height}px`}
			xmlns="http://www.w3.org/2000/svg"
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
		display:       block;
		width: 	       100%;
		height:        100%;
		overflow:      auto;
		cursor:        grab;
	}

	diagram.isDragging {
		cursor: grabbing;
	}

	svg {
		width:   var(--width);
		height:  var(--height);
		display: block;
		margin:  auto;
	}
</style>