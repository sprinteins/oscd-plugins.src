import ELK, { type ElkNode } from "elkjs/lib/elk.bundled"
import type { IEDNetworkInfo, SubnetworkConnection } from "@oscd-plugins/core"
import type { Config } from "../../communication-explorer/_func-layout-calculation/config"
import type { BayNode, IEDNode, RootNode, SubnetworkEdge } from "../../../components/diagram"

const defaultConfigs: Partial<Config> = {
	spacingBase:         20,
	spacingBetweenNodes: 20,
}

function generateBayNodes(iedsByBay: Map<string, IEDNetworkInfo[]>): BayNode[] {
	const nodes: BayNode[] = []

	for (const [bay, ieds] of iedsByBay.entries()) {
		const children = ieds.map((ied, index) => ({
			id:         `ied-${ied.iedName}`,
			label:      ied.iedName,
			isRelevant: true,
			width:      100,
			height:     30,
		}))

		nodes.push({
			id:        `bay-${bay}`,
			isBayNode: true,
			label:     bay,
			width:     600,
			height:    300,
			children,
		})
	}

	return nodes
}

function generateSubnetworks(ieds: IEDNetworkInfo[]): IEDNode[] {
	const subnetworkNames = ieds.map(ied => ied.subneworkConnections.map(sc => sc.subnetwork))
		.flat()

	const uniqueSubnetworks = [...new Set(subnetworkNames)]

	const subnetworkNodes: IEDNode[] = uniqueSubnetworks.map(subnetworkName => ({
		id:         `subnetwork-${subnetworkName}`,
		label:      subnetworkName,
		isRelevant: true,
		width:      200,
		height:     50,
	}))

	subnetworkNodes.forEach(node => {
		const edges = generateSubnetworkConnections(node, ieds)

		console.log(edges)

		node.edges = edges
	})

	return subnetworkNodes
}

function generateSubnetworkConnections(subnetwork: IEDNode, ieds: IEDNetworkInfo[]): SubnetworkEdge[] {
	const connections: SubnetworkEdge[] = []

	const connectedIeds = ieds.filter(ied => ied.subneworkConnections.some(sc => sc.subnetwork === subnetwork.label))

	if (connectedIeds.length === 1) {
		connections.push({
			id:      `con_subnetwork_${subnetwork.label}`,
			targets: [ subnetwork.id ],
			sources: connectedIeds.map(ied => `ied-${ied.iedName}`),
		})
	}

	return connections
}

export async function calculateLayout(
	iedsByBay: Map<string, IEDNetworkInfo[]>, 
): Promise<RootNode> {
	const bayNodes: BayNode[] = generateBayNodes(iedsByBay)
	const allIeds = Array.from(iedsByBay.values()).flat()
	const subnetworkNodes = generateSubnetworks(allIeds)

	const edges = subnetworkNodes.map(node => node.edges).flat()
	console.log(edges)

	const children = [...bayNodes, ...subnetworkNodes]

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

			"org.eclipse.elk.hierarchyHandling": "INCLUDE_CHILDREN",
			
			"org.eclipse.elk.layered.spacing.baseValue":             String(defaultConfigs.spacingBase),
			"org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": String(defaultConfigs.spacingBetweenNodes),
		},
		children,
	}

	// message type information gets lost here
	const nodes = (await elk.layout(graph)) as RootNode

	return nodes
}