<script lang="ts">
	import { path as d3Path } from "d3-path";
  	import type { ElkEdgeSection, ElkExtendedEdge, ElkNode } from "elkjs/lib/elk-api";
	import css from './message.css?inline';
	import {selectedIEDNode} from "../../stores/selectedFilter"
	import type {SelectedFilter} from "../../stores/selectedFilter"
    import { onDestroy } from "svelte";

	console.log({level:"dev", msg:"init message path"})
	export let edge: ElkExtendedEdge

	let isRelevant: boolean = true
	let selectedOptions: SelectedFilter | undefined
	let path: string 
	$: path = edge && draw(edge.sections![0])
	
	function draw(section: ElkEdgeSection): string{
		if(!section){ return "" }
		
		const path = d3Path();
		path.moveTo(section.startPoint.x, section.startPoint.y);
		
		if (section.bendPoints) {
			section.bendPoints.forEach((b) => {
				path.lineTo(b.x, b.y);
			});
		}
		path.lineTo(section.endPoint.x, section.endPoint.y);
		
		let isInSourceNodes: string | undefined
		let isInTargetNodes: string | undefined

		isInSourceNodes = arrayContains(edge.sources, selectedOptions?.selectedIED?.id)
		isInTargetNodes = arrayContains(edge.targets, selectedOptions?.selectedIED?.id)

		let isIncomingConnection: boolean | undefined = selectedOptions?.incomingConnections
		let isOutgoingConnection: boolean | undefined = selectedOptions?.outgoingConnections

		if (selectedOptions?.selectedIED != undefined) {
			
			if (isIncomingConnection && isOutgoingConnection) {
				isRelevant = Boolean(
					isInSourceNodes != undefined && isInSourceNodes != "" || 
					isInTargetNodes != undefined && isInTargetNodes != ""
				)
			} else if (isIncomingConnection && !isOutgoingConnection) {
				isRelevant = Boolean(isInSourceNodes != undefined && isInSourceNodes != "")
			} else if (!isIncomingConnection && isOutgoingConnection) {
				isRelevant = Boolean(isInTargetNodes != undefined && isInTargetNodes != "")
			} else {
				isRelevant = false
			}

		}

		return path.toString()
	}

	function arrayContains(input: string[], find: string | undefined): string | undefined {
		if (find == undefined) {
			return undefined
		}

		return input.find((value: string, index: number, obj: string[]) => {
				if (value == find) {
					return value
				}
			})
	}

	const unsubscribe = selectedIEDNode.subscribe(value => {
		selectedOptions = value
		path = edge && draw(edge.sections![0])
	}) 

	onDestroy(unsubscribe)

</script>

<svelte:options tag="tscd-message" />
<svelte:element this="style">{@html css}</svelte:element>

<g>
	{#if path}
		<path d={path} class="path-hover-box"></path>
		<path d={path} class="path-strong"></path>
		<path d={path} class:irrelevant={!isRelevant} class="path"></path>
	{/if}
</g>