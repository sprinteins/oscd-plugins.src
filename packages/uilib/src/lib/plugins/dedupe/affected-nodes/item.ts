import type { openSCDIcons } from "../../../components/icons"

export type Item = {
	elementId: string
	elementType: keyof typeof openSCDIcons
	usedElementId: string
}