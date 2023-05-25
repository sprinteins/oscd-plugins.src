import type { openSCDIcons } from "../../../icons"

export type Item = {
	elementId: string
	elementType: keyof typeof openSCDIcons
	usedElementId: string
}