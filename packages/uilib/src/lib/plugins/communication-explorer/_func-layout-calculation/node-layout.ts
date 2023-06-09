import ELK, { type ElkNode } from "elkjs/lib/elk.bundled"
import type { IEDCommInfo } from "@oscd-plugins/core"
import { MessageType } from "@oscd-plugins/core"
import type { SelectedFilter } from "../_store-view-filter"
import { generateConnectionLayout } from "."
import type { IEDNode, RootNode } from "../../../components/diagram"
import { generateIEDLayout, type Config } from "./node-layout-ieds"



export async function calculateLayout(
	ieds: IEDCommInfo[], 
	config: Config, 
	selectionFilter: SelectedFilter,
): Promise<RootNode> {
		
	if(selectionFilter.nameFilter !== ""){
		ieds = ieds.filter(ied => ied.iedName.toLowerCase().includes(selectionFilter.nameFilter.toLowerCase()))
	}

	let edges = generateConnectionLayout(ieds, selectionFilter)
	console.log({level: "dev", msg: "calculateLayout", edges})
	let children: IEDNode[] = generateIEDLayout(ieds, edges, config, selectionFilter)

	if(selectionFilter.hideIrrelevantStuff){
		children = children.filter(child => child.isRelevant)
		edges = edges.filter(edge => edge.isRelevant)
	}

	const elk = new ELK()

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
