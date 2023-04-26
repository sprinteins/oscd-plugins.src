<svelte:options tag="tscd-message" />

<script lang="ts">
	import { path as d3Path } from "d3-path"
	import type { IEDConnection } from "./nodes"
	import { MessageType } from "@oscd-plugins/core"


	//
	// Input
	//
	export let edge: IEDConnection

	let path: string
	$: path = draw(edge)


	const defaultColor = "var(--color-black)"
	const messageTypeToColorMap: {[key in MessageType]: string} = {
		[MessageType.GOOSe]:         "var(--color-green)",
		[MessageType.MMS]:	         defaultColor,
		[MessageType.SampledValues]: defaultColor,
	}

	$: pathColor = calcPathColor(edge)


	function draw(edge?: IEDConnection): string {
		const sections = edge?.sections??[]
		if(sections.length === 0){ return "" }
		
		const section = sections[0]
		
		if(!section){ return "" }
		
		const path = d3Path()
		path.moveTo(section.startPoint.x, section.startPoint.y)

		if (section.bendPoints) {
			section.bendPoints.forEach((b) => {
				path.lineTo(b.x, b.y)
			})
		}
		path.lineTo(section.endPoint.x, section.endPoint.y)
	
		return path.toString()
	}

	function calcPathColor(edge?: IEDConnection): string {
		if(!edge?.messageType){ return defaultColor }

		const color = messageTypeToColorMap[edge.messageType]
		return color || defaultColor
	}
</script>

<g>
	{#if path}
		<path d={path} class="path-hover-box" />
		<path d={path} class="path-strong" />
		<path
			d={path}
			class:irrelevant={!edge.isRelevant}
			class="path"
			style="stroke: {pathColor};"
		/>
	{/if}
</g>
