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