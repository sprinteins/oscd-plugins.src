import type { IEDConnection, IEDNode } from "../../components/diagram"
import { MessageType, allMessageTypes } from "@oscd-plugins/core"
import { selectedIEDNode } from "./"

export function selectIEDNode(node: IEDNode) {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			selectedIED:        node,
			selectedConnection: undefined,
		}
	})
}

export function selectConnection(connection: IEDConnection) {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			selectedConnection: connection,
			selectedIED:        undefined,
		}
	})
}

export function clearSelection() {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			incomingConnections:  true,
			outgoingConnections:  true,
			selectedMessageTypes: [...allMessageTypes],
			selectedIED:          undefined,
		// 	hideIrrelevantStuff:  false,
		// 	nameFilter:           "",
		}
	})
}

export function changeMessageConnectionFilterDirection(incoming: boolean, outgoing: boolean) {
	selectedIEDNode.update((value) => {
		return {
			...value,
			incomingConnections: incoming,
			outgoingConnections: outgoing,
		}
	})
}

function addOrRemoveMessageType(list: string[], messageType: string, checked: boolean): string[] {
	if (checked) {

		const containsTypeAlready = list.includes(messageType)
		if (!containsTypeAlready) {
			list.push(messageType)
		}

		return list
	}

	return list.filter((item) => item !== messageType)
}

export function setSelectedMessageTypes(type: MessageType, isActived: boolean) {
	selectedIEDNode.update((value) => {
		return {
			...value, 
			selectedMessageTypes: addOrRemoveMessageType(value.selectedMessageTypes, type, isActived),
		}
	})
}

export function setHideIrrelevantStuff(hide: boolean) {
	selectedIEDNode.update((value) => {
		return {
			...value, 
			hideIrrelevantStuff: hide,
		}
	})
}

export function setNameFilter(filter: string) {
	selectedIEDNode.update((value) => {
		return {
			...value, 
			nameFilter: filter,
		}
	})
}