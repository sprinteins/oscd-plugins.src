<script lang="ts">
	import { path as d3Path } from "d3-path";
	import type { ElkEdgeSection } from "elkjs/lib/elk-api";
	import { onDestroy } from "svelte";
	import type { IEDConnection } from "./nodes";

	// 
	// Input
	// 
	export let edge: IEDConnection

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
	
		return path.toString()
	}

</script>

<svelte:options tag="tscd-message" />

<g>
	{#if path}
		<path d={path} class="path-hover-box"></path>
		<path d={path} class="path-strong"></path>
		<path d={path} class:irrelevant={!edge.isRelevant} class="path"></path>
	{/if}
</g>