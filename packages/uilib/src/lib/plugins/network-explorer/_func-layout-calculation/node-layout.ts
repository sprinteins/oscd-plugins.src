import ELK, { type ElkNode } from "elkjs/lib/elk.bundled"
import type { IEDNetworkInfo } from "@oscd-plugins/core"
import type { Config } from "../../communication-explorer/_func-layout-calculation/config"
import type { BayNode, IEDNode, RootNode } from "../../../components/diagram"

const defaultConfigs: Partial<Config> = {
	spacingBase:         20,
	spacingBetweenNodes: 20,
}

function generateBayNodes(iedsByBay: Map<string, IEDNetworkInfo[]>): BayNode[] {
	const nodes: BayNode[] = []

	for (const [bay, ieds] of iedsByBay.entries()) {
		const children = ieds.map((ied, index) => ({
			id:     index.toString(),
			label:  ied.iedName,
			labels: [{text: ied.iedName}],
			width:  100,
			height: 30,
		}))

		nodes.push({
			id:        bay,
			isBayNode: true,
			label:     bay,
			// width:     600,
			// height:    300,
			children,
		})
	}

	return nodes
}

export async function calculateLayout(
	iedsByBay: Map<string, IEDNetworkInfo[]>, 
): Promise<RootNode> {
	const children: BayNode[] = generateBayNodes(iedsByBay)

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
			
			// default: 20; a component is when multiple nodes are connected
			// "org.eclipse.elk.spacing.componentComponent": "20", 
			
			"org.eclipse.elk.layered.spacing.baseValue":             String(defaultConfigs.spacingBase),
			"org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": String(defaultConfigs.spacingBetweenNodes),
		},
		children,
	}

	// message type information gets lost here
	const nodes = (await elk.layout(graph)) as RootNode

	return nodes
}