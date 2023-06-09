import type { IEDCommInfo } from "@oscd-plugins/core"
import type { IEDConnectionWithCustomValues } from "../../../components/diagram"
import { hasActiveIEDSelection, isIEDSelected, type SelectedFilter } from "../_store-view-filter"
import {Id, messageTypeMap} from "./"

export function generateConnectionLayout(ieds: IEDCommInfo[], selectionFilter: SelectedFilter): IEDConnectionWithCustomValues[] {
	const hasSelection = hasActiveIEDSelection()
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

	return edges
}

function checkRelevance(selectionFilter: SelectedFilter, targetIED: IEDCommInfo, sourceIED: IEDCommInfo): boolean {
	
	// Note: better then doing the search ourselves but still not optimal
	const isTargetIEDSelected = isIEDSelected({label: targetIED.iedName})
	const isSourceIEDSelected = isIEDSelected({label: sourceIED.iedName})

	if (selectionFilter.outgoingConnections && !selectionFilter.incomingConnections) {
		return isTargetIEDSelected
	}
	
	if (selectionFilter.incomingConnections && !selectionFilter.outgoingConnections) {
		return isSourceIEDSelected
	}
	
	if (selectionFilter.incomingConnections && selectionFilter.outgoingConnections) {
		return isSourceIEDSelected || isTargetIEDSelected
	}
	
	const everythingIsRelevantIfThereIsNoSelection = true
	return everythingIsRelevantIfThereIsNoSelection
}