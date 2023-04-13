<script lang="ts">
	import { path as d3Path } from "d3-path";
  	import type { ElkEdgeSection, ElkExtendedEdge } from "elkjs/lib/elk-api";
	import css from './message.css?inline';


	console.log({level:"dev", msg:"init message path"})
	export let edge: ElkExtendedEdge

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
		
		console.log({level:"dev", msg:"message element", path: path.toString()})
		
		return path.toString()
	}

</script>

<svelte:options tag="tscd-message" />
<svelte:element this="style">{@html css}</svelte:element>

<g>
	{#if path}
		<path d={path} class="path-hover-box"></path>
		<path d={path} class="path-strong"></path>
		<path d={path} class="path"></path>
	{/if}
</g>


<style>
	.path, .path-strong, .path-hover-box {
		fill: none;
		cursor: pointer;
	}
	.path {
		stroke-width: 0.0625rem;
	}
	.path-hover-box {
		stroke-width: .8rem;
		stroke: transparent;
		opacity: .1;
	}
	.path-strong {
		stroke-width: 0.275rem;
		stroke: #00ff00;
		opacity: 0;
	}
	.path-hover-box:hover ~ .path-strong,
	.path-strong:hover {
		opacity: 1 !important;
	}
	
	
</style>