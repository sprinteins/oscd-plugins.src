import type { IEDCommInfo } from "@oscd-plugins/core"
import type { IEDConnectionWithCustomValues } from "../../../components/diagram"
import type { SelectedFilter } from "../_store-view-filter"
import {Id, messageTypeMap} from "./"

export type layoutConnectionResult = {
    edges: IEDConnectionWithCustomValues[]
}

export function generateConnectionLayout(ieds: IEDCommInfo[], selectionFilter: SelectedFilter): layoutConnectionResult {
	const hasSelection = Boolean(selectionFilter.selectedIED)
	let connectionCounter = 0
    
	const edges: IEDConnectionWithCustomValues[] = ieds.map( (targetIED, ii) => { 
		const iedConnections: IEDConnectionWithCustomValues[] = []
		targetIED.received.forEach( message => {

			const sourceIEDName = message.iedName
			const sourceIEDIndex = ieds.findIndex((sourceIED) => sourceIED.iedName === sourceIEDName)
			if(sourceIEDIndex === -1) {
				console.warn({level: "warn", msg: "calculateLayout: source IED not found, continuing", sourceIEDName, ieds})
				return
			}
			const sourceIED = ieds[sourceIEDIndex]
			const targetIED = ieds[ii]

			const selectedMessageTypes: string[] = selectionFilter.selectedMessageTypes
			const messageType = messageTypeMap[message.serviceType]

			// check messageType for undefined so unknown message types are also displayed
			const isRelevantMessageType: boolean = (selectedMessageTypes.includes(messageType) || messageType === undefined)

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
			
			const connectionID = `con_${Id(sourceIEDIndex)}_${Id(ii)}_${messageType}_${connectionCounter}`
			connectionCounter++
			
			const connection = { 
				id:               connectionID, 
				sources:          [Id(sourceIEDIndex)], 
				targets:          [Id(ii)], 
				sourceIED:        sourceIED,
				targetIED:        targetIED,
				isRelevant,
				relevantIEDNames: [targetIED.iedName, sourceIED.iedName],
				messageType:      messageType,
			} 
			iedConnections.push(connection)
		}) 
		return iedConnections
	}).flat() 

	return {
		edges,
	}
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