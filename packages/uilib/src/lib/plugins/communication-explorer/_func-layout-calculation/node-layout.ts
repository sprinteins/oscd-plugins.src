import ELK, { type ElkNode } from "elkjs/lib/elk.bundled"
import type { IEDCommInfo } from "@oscd-plugins/core"
import { MessageType } from "@oscd-plugins/core"
import type { SelectedFilter } from "../_store-view-filter"
import { generateConnectionLayout } from "."
import type { IEDNode, RootNode } from "../../../components/diagram"


type Config = {
	width: number,
	height: number,
	// heightPerConnection: number,
}

export const messageTypeMap:{[key: string]: MessageType} = {
	"GOOSE": MessageType.GOOSE,
	"SMV":   MessageType.SampledValues,
}

export async function calculateLayout(ieds: IEDCommInfo[], config: Config, selectionFilter: SelectedFilter): Promise<RootNode> {
	const hasSelection = Boolean(selectionFilter.selectedIED)
		
	if(selectionFilter.nameFilter !== ""){
		ieds = ieds.filter(ied => ied.iedName.toLowerCase().includes(selectionFilter.nameFilter.toLowerCase()))
	}

	const connectionsResult = generateConnectionLayout(ieds, selectionFilter)
	// todo improve reintroduce variables here
	let edges = connectionsResult.edges
	
	
	const relevantEdges = edges.filter(edge => edge.isRelevant)
	const relevantNodes = new Set<string>()
	relevantEdges.forEach(edge => {
		edge.relevantIEDNames?.forEach(iedName => { relevantNodes.add(iedName) })
	})

	let children: IEDNode[] = ieds.map((ied, ii) => {
		let isRelevant = true
		if (hasSelection) {
			isRelevant = relevantNodes.has(ied.iedName) || selectionFilter.selectedIED?.label === ied.iedName	
		}

		return {
			id:         Id(ii),
			width:      config.width,
			height:     config.height,
			label:      ied.iedName,
			isRelevant: isRelevant,
		}
	})

	const elk = new ELK()

	if(selectionFilter.hideIrrelevantStuff){
		children = children.filter(child => child.isRelevant)
		edges = edges.filter(edge => edge.isRelevant)
	}

	// Need more configuration options of elk.js?
	// 👉 https://www.eclipse.org/elk/reference/algorithms.html 
	const graph: ElkNode = {
		id:            "graph-root",
		layoutOptions: {
			"elk.algorithm":                                           "org.eclipse.elk.layered",
			"org.eclipse.elk.layered.unnecessaryBendpoints":           "true",
			"org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "RIGHTUP",
			"org.eclipse.elk.direction":                               "LEFT",
		},
		children,
		edges,
	}

	const nodes = (await elk.layout(graph)) as RootNode

	return nodes
}

export function Id(something: unknown): string {
	return `ied-${something}`
}
