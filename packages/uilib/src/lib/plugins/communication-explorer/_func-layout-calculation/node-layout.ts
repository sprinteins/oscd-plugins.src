import ELK, { type ElkNode } from "elkjs/lib/elk.bundled"
import type { IEDCommInfo } from "@oscd-plugins/core"
import { MessageType } from "@oscd-plugins/core"
import type { SelectedFilter } from "../_store-view-filter"
import { generateConnectionLayout } from "."
import type { IEDNode, RootNode } from "../../../components/diagram"
import { generateIEDLayout } from "./node-layout-ieds"


export type Config = {
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

	let edges
	const connectionsResult = generateConnectionLayout(ieds, selectionFilter)
	edges = connectionsResult.edges
	let children: IEDNode[] = generateIEDLayout(ieds, edges, config, selectionFilter)

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

	// message type information gets lost here
	const nodes = (await elk.layout(graph)) as RootNode

	return nodes
}

export function Id(something: unknown): string {
	return `ied-${something}`
}
