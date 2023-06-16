import { MessageType, type IEDCommInfo } from "@oscd-plugins/core"
import type { IEDConnectionWithCustomValues } from "../../../components/diagram"
import { hasActiveIEDSelection, isIEDSelected, type SelectedFilter } from "../_store-view-filter"

export const messageTypeMap:{[key: string]: MessageType} = {
	"GOOSE": MessageType.GOOSE,
	"SMV":   MessageType.SampledValues,
	"MMS":   MessageType.MMS,
}

export function generateConnectionLayout(ieds: IEDCommInfo[], selectionFilter: SelectedFilter): IEDConnectionWithCustomValues[] {
	
	const hasSelection = hasActiveIEDSelection()
	
	const incomingEdges: IEDConnectionWithCustomValues[] = ieds.map( (targetIED, index) => { 
		const receivedConnections = convertReceivedMessagesToConnections(
			targetIED, 
			ieds, 
			index, 
			selectionFilter, 
			hasSelection, 
		)

		return receivedConnections
	}).flat()
	

	const outgoingEdges: IEDConnectionWithCustomValues[] = ieds.map( (sourceIED, index) => {
		const publishedConnections = convertPublishedMessagesToConnections(
			sourceIED, 
			ieds, 
			index, 
			selectionFilter, 
			hasSelection, 
		)

		return publishedConnections
	}).flat()
	

	return [...incomingEdges, ...outgoingEdges]
}

function convertPublishedMessagesToConnections(
	sourceIED: IEDCommInfo, 
	ieds: IEDCommInfo[], 
	ii: number, 
	selectionFilter: SelectedFilter, 
	hasSelection: boolean, 
): IEDConnectionWithCustomValues[] {
	
	let connectionCounter = 0
	const iedConnections: IEDConnectionWithCustomValues[] = []
	
	sourceIED.published.forEach(message => {
		// 
		// Prepare
		// 
		const targetIEDName = message.targetIEDName
		const targetIEDIndex = ieds.findIndex((targetIED) => targetIED.iedName === targetIEDName)
		if (targetIEDIndex === -1) {
			console.warn({ level: "warn", msg: "calculateLayout: source IED not found, continuing", targetIEDName, ieds })
			return
		}
		const targetIED = ieds[targetIEDIndex]
		const messageType = messageTypeMap[message.serviceType]
		const connectionID = `con_published_${Id(targetIEDIndex)}_${Id(ii)}_${messageType}_${connectionCounter++}`

		// 
		// Relevancy
		// 
		const selectedMessageTypes: string[] = selectionFilter.selectedMessageTypes
		const isUnknownMessageType: boolean = messageType === undefined
		const isRelevantMessageType: boolean = (selectedMessageTypes.includes(messageType) || isUnknownMessageType)
		
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

		// 
		// Assembly
		// 
		const connection = {
			id:               connectionID,
			sources:          [Id(targetIEDIndex)],
			targets:          [Id(ii)],
			sourceIED:        sourceIED,
			targetIED:        targetIED,
			isRelevant,
			relevantIEDNames: [sourceIED.iedName, targetIED.iedName],
			messageType:      messageType,
		}

		iedConnections.push(connection)
	})
	return iedConnections
}

function convertReceivedMessagesToConnections(
	targetIED: IEDCommInfo, 
	ieds: IEDCommInfo[], 
	ii: number, 
	selectionFilter: SelectedFilter, 
	hasSelection: boolean, 
): IEDConnectionWithCustomValues[] {
	let connectionCounter = 0
	const iedConnections: IEDConnectionWithCustomValues[] = []
	targetIED.received.forEach(message => {

		// 
		// Prepare
		// 
		const sourceIEDName = message.iedName
		const sourceIEDIndex = ieds.findIndex((sourceIED) => sourceIED.iedName === sourceIEDName)
		if (sourceIEDIndex === -1) {
			console.warn({ level: "warn", msg: "calculateLayout: source IED not found, continuing", sourceIEDName, ieds })
			return
		}
		const sourceIED = ieds[sourceIEDIndex]
		const targetIED = ieds[ii]

		const selectedMessageTypes: string[] = selectionFilter.selectedMessageTypes
		const messageType = messageTypeMap[message.serviceType]

		// 
		// Relevancy
		// 
		// check messageType for undefined so unknown message types are also displayed
		const isUnknownMessageType: boolean = messageType === undefined
		const isRelevantMessageType: boolean = (selectedMessageTypes.includes(messageType) || isUnknownMessageType)

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

		const connectionID = `con_received_${Id(sourceIEDIndex)}_${Id(ii)}_${messageType}_${connectionCounter}`
		connectionCounter++

		// 
		// Assembly
		// 
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

export function Id(something: unknown): string {
	return `ied-${something}`
}
