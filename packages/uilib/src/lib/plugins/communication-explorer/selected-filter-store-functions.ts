import type { IEDNode } from "../../components/diagram"
import { MessageType, allMessageTypes } from "@oscd-plugins/core"
import { selectedIEDNode } from "./"

export function selectNode(node: IEDNode) {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			selectedIED: node,
		}
	})
}

export function clearSelection() {
	selectedIEDNode.set({
		incomingConnections:  true,
		outgoingConnections:  true,
		selectedMessageTypes: [...allMessageTypes],
		selectedIED:          undefined,
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
