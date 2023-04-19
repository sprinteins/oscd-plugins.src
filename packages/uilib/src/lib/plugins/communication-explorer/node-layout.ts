import ELK, { type ElkNode } from "elkjs/lib/elk.bundled";
import type { IED, IEDCommInfo } from "@oscd-plugins/core";
import type { SelectedFilter } from "../../stores/selectedFilter"
import {selectedIEDNode} from "../../stores/selectedFilter"
import { onDestroy } from "svelte";

type Direction = "incoming" | "outgoing" | "both"

type Config = {
	width: number,
	height: number,
	filterDirection?: Direction
	selectedIEDName?: string
}

type Edge = {
	id: string,
	sources: string[],
	targets: string[],
	isRelevant: boolean
}
export async function calculateLayout(ieds: IEDCommInfo[], config: Config, selectedIED: SelectedFilter): Promise<ElkNode>{

	

	const children = ieds.map( (ied,ii) => {
		return { 
			id: 	Id(ii), 
			width:  config.width, 
			height: config.height, 
		}
	}) 

	console.log("generate with target: ", selectedIED);
	
	
	const direction = config.filterDirection || "both" 
	const edges = ieds.map( (ied, ii) => { 
		return Object.keys(ied.received).map( sourceIEDName => { 
			let isRelevant = true 
			const isThereFocus = selectedIED != undefined
			
			if (isThereFocus) { 
				let isFocuesIED = false 
				
				if (direction === "incoming") 	{ 	isFocuesIED = config.selectedIEDName === ied.iedName 	} 
				if (direction === "outgoing") 	{ 	isFocuesIED = config.selectedIEDName === sourceIEDName 	} 
				if (direction === "both") 		{ 
													isFocuesIED = config.selectedIEDName === sourceIEDName || 
													config.selectedIEDName === ied.iedName 
												} 
				
				isRelevant = isFocuesIED 
			} 
			
			const sourceIEDIndex = ieds.findIndex((sourceIED) => sourceIED.iedName === sourceIEDName)

			return { 
				id: `connection_${Id(sourceIEDIndex)}_${Id(ii)}`, 
				sources: [Id(sourceIEDIndex)], 
				targets: [Id(ii)], 
				isRelevant: isRelevant, 
			} 
		}) 
	}).flat() 

	console.log("erg: ", edges);
	
	
	const elk = new ELK() 
	
	// https://www.eclipse.org/elk/reference/algorithms.html 
	const graph: ElkNode = { 
		id: "graph-root", 
		layoutOptions: { 
			// "elk.algorithm": "org.eclipse.elk.force", 
			// "elk.algorithm": "org.eclipse.elk.stress", 
			"elk.algorithm": "org.eclipse.elk.layered", 
			// "elk.algorithm": "org.eclipse.elk.mrtree", 
			// "elk.algorithm": "org.eclipse.elk.radial", 
			"org.eclipse.elk.layered.unnecessaryBendpoints": "true", 
		}, 
		children, 
		edges, 
	} 

	const nodes = await elk.layout(graph) 

	return nodes; 
} 

function Id(something:unknown): string { 
	return `ied-${something}`
}