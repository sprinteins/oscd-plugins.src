<script lang="ts">
	import { path as d3Path } from "d3-path"
	import type { IEDConnection } from "./nodes"
	import { MessageType } from "@oscd-plugins/core"
	import type { ElkEdgeSection } from "elkjs"

	//
	// Input
	//
	export let edge: IEDConnection
	export let isSelected = false

	let path: string
	$: path = draw(edge)

	let arrowRightHeight = 0
	let arrowRightWidth = 0
	let arrowTopHeight = 0
	let arrowTopWidth = 0
	let arrowBottomHeight = 0
	let arrowBottomWidth = 0

	const defaultColor = "var(--color-black)"
	const messageTypeToColorMap: { [key in MessageType]: string } = {
		[MessageType.GOOSe]:         "var(--color-message-goose)",
		[MessageType.MMS]:           "var(--color-message-mms)",
		[MessageType.SampledValues]: "var(--color-message-sampledvalues)",
	}

	$: pathColor = calcPathColor(edge)

	function draw(edge?: IEDConnection): string {
		const arrowSize = 10

		const sections = edge?.sections ?? []
		if (sections.length === 0) {
			return ""
		}

		const section = sections[0]

		if (!section) {
			return ""
		}

		const reverseDirection = section.endPoint.x < section.startPoint.x

		const path = d3Path()
		path.moveTo(section.startPoint.x, section.startPoint.y)

		if (section.bendPoints) {
			section.bendPoints.forEach((b) => {
				path.lineTo(b.x, b.y)
			})
		}

		let endpointX = section.endPoint.x - arrowSize
		if (reverseDirection) {
			endpointX = section.endPoint.x + arrowSize
		}
		path.lineTo(endpointX, section.endPoint.y)

		calcArrow(section, reverseDirection, arrowSize)

		return path.toString()
	}

	function calcPathColor(edge?: IEDConnection): string {
		if (!edge?.messageType) {
			return defaultColor
		}

		const color = messageTypeToColorMap[edge.messageType]
		return color || defaultColor
	}

	function calcArrow(
		section: ElkEdgeSection,
		reverseDirection: boolean,
		arrowSize: number
	) {
		arrowRightHeight = section.endPoint.y
		arrowRightWidth = section.endPoint.x

		arrowTopHeight = section.endPoint.y + arrowSize / 2
		arrowBottomHeight = section.endPoint.y - arrowSize / 2

		if (reverseDirection) {
			arrowTopWidth = section.endPoint.x + arrowSize
			arrowBottomWidth = section.endPoint.x + arrowSize
		} else {
			arrowTopWidth = section.endPoint.x - arrowSize
			arrowBottomWidth = section.endPoint.x - arrowSize
		}
	}
</script>

<g
	on:click
	on:keypress
	class:show-selected-path={isSelected}
	class:selected={isSelected}
	data-testid="connection"
>
	{#if path}
		<path d={path} class="path-hover-box" />
		<path d={path} class="path-strong" />
		<path d={path} class="path-selected" style="stroke: {pathColor};" />
		<path
			d={path}
			class:irrelevant={!edge.isRelevant}
			class="path"
			style="stroke: {pathColor};"
		/>
		<path
			d="M{arrowRightWidth} {arrowRightHeight} L{arrowBottomWidth} {arrowBottomHeight} L{arrowTopWidth} {arrowTopHeight} Z"
			style="fill: {pathColor};"
		/>
		<circle
			cx={edge?.sections?.at(0)?.startPoint?.x}
			cy={edge?.sections?.at(0)?.startPoint?.y}
			r="2"
			style="fill: {pathColor}; z-index: 1000;"
		/>
	{/if}
</g>

<style>
	.path,
	.path-strong,
	.path-hover-box,
	.path-selected {
		fill: none;
		cursor: pointer;
	}

	.path {
		stroke-width: 0.08rem;
		stroke: var(--color-black, #000);
	}

	.path-hover-box {
		stroke-width: 0.8rem;
		stroke: transparent;
		opacity: 0.1;
	}

	.path-strong {
		stroke-width: 0.275rem;
		stroke: var(--color-yellow);
		opacity: 0;
	}

	.path-selected {
		stroke-width: 0.275rem;
		display: none;
	}

	.selected .path-selected {
		display: block;
	}

	.path-hover-box:hover ~ .path-strong,
	.path-strong:hover {
		opacity: 1;
	}

	.irrelevant {
		opacity: 0.2;
	}
</style>
