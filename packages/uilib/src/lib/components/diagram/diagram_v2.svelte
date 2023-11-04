<script lang="ts">
	import type { ElkExtendedEdge } from "elkjs"
	import { createEventDispatcher } from "svelte"
	import { Controls, Node, Svelvet, ThemeToggle } from "svelvet"
	import {
		isIEDSelected
	} from "../../plugins/communication-explorer/_store-view-filter"
	import type {
		IEDConnectionWithCustomValues,
		IEDNode,
		RootNode,
	} from "./nodes"

	//
	// Inputs
	//
	export let rootNode: RootNode
	export let playAnimation = true
	export let showConnectionArrows = true
	$: console.log({level: "dev", rootNode})

	//
	// Setup
	//
	let svgRoot: SVGElement
	let root: HTMLElement

	const dispatch = createEventDispatcher()
	function handleIEDClick(e: MouseEvent, node: IEDNode) {
		if (draggingEnabled) {
			return
		}
		const isAdditiveSelect = e.metaKey || e.ctrlKey || e.shiftKey
		if (isAdditiveSelect) {
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
		if (draggingEnabled) {
			return
		}
		dispatch("connectionclick", connection)
	}

	function handleClick(e: Event) {
		if (draggingEnabled || isDragging) {
			return
		}
		if (e.target !== svgRoot && e.target !== root) {
			return
		}

		dispatch("clearclick")
	}

	function isConnectionsAnyIEDSelected(
		connection: IEDConnectionWithCustomValues
	): boolean {
		return (
			isIEDSelected({ label: connection.sourceIED.iedName }) ||
			isIEDSelected({ label: connection.targetIED.iedName })
		)
	}

	//
	// Draggable Diagram
	//
	let pos = { top: 0, left: 0, x: 0, y: 0 }
	let draggingEnabled = false
	let isDragging = false
	function handleKeyDown(e: KeyboardEvent) {
		if (e.code !== "Space") {
			return
		}

		draggingEnabled = true
		e.stopImmediatePropagation()
		e.stopPropagation()
		e.preventDefault()
	}
	function handleMouseDown(e: MouseEvent) {
		if (!draggingEnabled) {
			return
		}

		isDragging = true
		pos = {
			// The current scroll
			left: root.scrollLeft,
			top:  root.scrollTop,
			// Get the current mouse position
			x:    e.clientX,
			y:    e.clientY,
		}

		e.stopImmediatePropagation()
		e.stopPropagation()
		e.preventDefault()
	}
	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) {
			return
		}

		// How far the mouse has been moved
		const dx = e.clientX - pos.x
		const dy = e.clientY - pos.y

		// Scroll the element
		root.scrollTop = pos.top - dy
		root.scrollLeft = pos.left - dx
	}

	function handleMouseUp(e: MouseEvent) {
		isDragging = false
		e.stopImmediatePropagation()
		e.stopPropagation()
		e.preventDefault()
	}

	function handleMouseLeave(e: MouseEvent) {
		disableDragging()
	}

	function handleKeyUp(e: KeyboardEvent) {
		disableDragging()
	}
	function disableDragging() {
		draggingEnabled = false
		isDragging = false
	}

	//
	// Zoom
	//
	let zoomModifier = 1
	let zoomStep = 0.1
	let svgWidth = rootNode.width ?? 0
	let svgHeight = rootNode.height ?? 0

	async function handleMouseWheel(e: WheelEvent) {
		if (!e.ctrlKey && !e.metaKey) {
			return
		}

		const direction = e.deltaY < 0 ? 1 : -1
		const zooming = zoomModifier + zoomStep * direction
		const newSVGWidth = svgWidth * zooming
		const newSVGHeight = svgHeight * zooming
		if (newSVGWidth < 0 || newSVGHeight < 0) {
			return
		}

		svgHeight = newSVGHeight
		svgWidth = newSVGWidth
	}

	function findOutgoingConnections(srcIEDId:string): string[] {
		const edges = rootNode.edges ?? []
		const conenctedIEDIds: string[] = []
		for (const edge of edges) {
			if(edge.sources.includes(srcIEDId)) {
				conenctedIEDIds.push(...edge.targets)
			}
		}
		console.log({level: "dev", conenctedIEDIds})
		return conenctedIEDIds
	}

	function findIncomingConnections(targetIEDId: string): string[]{

		const edges = rootNode.edges ?? []
		const conenctedIEDIds: string[] = []
		for (const edge of edges) {
			if(edge.sources.includes(targetIEDId)) {
				conenctedIEDIds.push(...edge.targets)
			}
		}
		console.log({level: "dev",targetIEDId, conenctedIEDIds})
		return conenctedIEDIds
	}
</script>

<svelte:body on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

{#if rootNode}
	<Svelvet id="my-canvas" minimap>
		{#if rootNode.children}
				{#each rootNode.children as node}
					{@const incomingConns=findIncomingConnections(node.id)}
					{@const outgoingConns=findOutgoingConnections(node.id)}
					<Node 
						id={node.id}
						dimensions={{width: node.width??0, height: node.height}} 
						position={{x: node.x??0, y: node.y??0}}
						label={`${node.label} + ${node.id}`}
						outputs={outgoingConns.length+1}
						inputs={incomingConns.length+1}
						connections={incomingConns}
					/>
				{/each}
			{/if}

		<ThemeToggle main='dark' alt='light' slot='toggle'/>
		<Controls slot="controls" horizontal />
  	</Svelvet>
{/if}

<style>
	

</style>
