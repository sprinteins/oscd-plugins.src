import ELK, { type ElkNode } from "elkjs/lib/elk.bundled";
import type { IEDCommInfo } from "@oscd-plugins/core";
import type { IEDConnection, IEDNode, RootNode } from "../../components/diagram/nodes";
import type { SelectedFilter } from "./"
import { MessageType } from "@oscd-plugins/core"


type Config = {
	width: number,
	height: number,
}

export async function calculateLayout(ieds: IEDCommInfo[], config: Config, selectionFilter: SelectedFilter): Promise<RootNode> {

	const hasSelection = Boolean(selectionFilter.selectedIED)

	const edges: IEDConnection[] = ieds.map( (targetIED, ii) => { 
		const iedConnections: IEDConnection[] = []
		Object.keys(targetIED.received).forEach( sourceIEDName => { 
		
			const sourceIEDIndex = ieds.findIndex((sourceIED) => sourceIED.iedName === sourceIEDName)
			if(sourceIEDIndex === -1) {
				console.warn({level:"warn", msg:"calculateLayout: source IED not found, continuing", sourceIEDName, ieds})
				return
			}
			const sourceIED = ieds[sourceIEDIndex]

			const selectedMessageTypes: string[] = selectionFilter.selectedMessageTypes;
			const messageType = MessageType.GOOSe;
			const isRelevantMessageType: boolean = selectedMessageTypes.includes(messageType)

			let isRelevant = true
			if (hasSelection) {

				isRelevant = checkRelevance(selectionFilter, targetIED, sourceIED)

				if (isRelevant && !isRelevantMessageType) {
					isRelevant = false
				} 

			} else {

				if (!isRelevantMessageType) {
					isRelevant = false
				}
				
			}

			const connection = { 
				id: `connection_${Id(sourceIEDIndex)}_${Id(ii)}`, 
				sources: [Id(sourceIEDIndex)], 
				targets: [Id(ii)], 
				isRelevant,
				relevantIEDNames: [targetIED.iedName, sourceIED.iedName],
				messageType: messageType,
			} 
			iedConnections.push(connection)
		}) 
		return iedConnections
	}).flat() 


	const relevantEdges = edges.filter(edge => edge.isRelevant)
	const relevantNodes = new Set<string>()
	relevantEdges.forEach(edge => {
		edge.relevantIEDNames?.forEach(iedName => { relevantNodes.add(iedName) })
	})

	const children: IEDNode[] = ieds.map((ied, ii) => {
		let isRelevant = true
		if (hasSelection) {
			isRelevant = relevantNodes.has(ied.iedName) || selectionFilter.selectedIED?.label === ied.iedName
		}
		return {
			id: Id(ii),
			width: config.width,
			height: config.height,
			label: ied.iedName,
			isRelevant: isRelevant,
		}
	})

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
			// "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "LEFTDOWN",
			// "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
			"org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "RIGHTUP",
			// "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "LEFTUP",
			// "org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "NONE",
			"org.eclipse.elk.direction": "LEFT",
			// "org.eclipse.elk.debugMode": "true",
		},
		children,
		edges,
	}

	const nodes = (await elk.layout(graph)) as RootNode

	return nodes;
}

function checkRelevance(selectionFilter: SelectedFilter, targetIED: IEDCommInfo, sourceIED: IEDCommInfo): boolean {
	let isRelevant = true

	if (selectionFilter.outgoingConnections && !selectionFilter.incomingConnections) {
		isRelevant = targetIED.iedName === selectionFilter.selectedIED?.label
	}

	if (selectionFilter.incomingConnections && !selectionFilter.outgoingConnections) {
		isRelevant = sourceIED.iedName === selectionFilter.selectedIED?.label
	}

	if (selectionFilter.incomingConnections && selectionFilter.outgoingConnections) {
		isRelevant = sourceIED.iedName === selectionFilter.selectedIED?.label ||
			targetIED.iedName === selectionFilter.selectedIED?.label
	}

	return isRelevant
}

function Id(something: unknown): string {
	return `ied-${something}`
}


