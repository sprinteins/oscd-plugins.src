import type { openSCDIcons } from "../../../components/icons"

export type Item = {
	icon: keyof typeof openSCDIcons
	primaryText: string
	secondaryText: string
}