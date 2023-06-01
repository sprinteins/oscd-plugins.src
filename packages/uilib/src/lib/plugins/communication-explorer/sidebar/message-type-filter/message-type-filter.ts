import type { MessageType } from "@oscd-plugins/core"
import { setSelectedMessageTypes } from "../../_store-view-filter"

export function isSelected(
	messageType: MessageType,
	selectedMessages: string[] = [],
) {
	return selectedMessages.includes(messageType)
}

export function setTargetMessageType(e: Event) {
	const element = e?.target as HTMLInputElement
	const name = element?.name as MessageType
	const value = element?.checked

	setSelectedMessageTypes(name, value)
}