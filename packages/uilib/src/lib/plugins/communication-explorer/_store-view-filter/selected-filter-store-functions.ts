import { selectedIEDNode } from "./selected-filter-store"
import type { IEDConnectionWithCustomValues, IEDNode } from "../../../components/diagram"
import { MessageType, allMessageTypes } from "@oscd-plugins/core"

export function selectIEDNode(node: IEDNode) {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			selectedIEDs:       [node],
			selectedConnection: undefined,
		}
	})
}

export function clearIEDSelection() {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			selectedIEDs:       [],
			selectedConnection: undefined,
		}
	})
}

export function selectConnection(connection: IEDConnectionWithCustomValues) {
	selectedIEDNode.update(selectedFilter => {
		return {
			...selectedFilter,
			selectedConnection: connection,
			selectedIEDs:       [],
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
			selectedIEDs:         [],
			selectedConnection:   undefined,
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

export function setHideConnectionArrows(hide: boolean) {
	selectedIEDNode.update((value) => {
		return {
			...value,
			showConnectionArrows: hide,
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