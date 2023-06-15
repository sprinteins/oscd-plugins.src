import type { IEDCommInfo } from "@oscd-plugins/core"
import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"

export function extractIEDInfos(root: Element): IEDCommInfo[] {
	if (!root) {
		console.info({ level: "info", msg: "initInfos: no root" })
		return []
	}
	const scdQueries = new SCDQueries(root)
	const ucci = new UCCommunicationInformation(scdQueries)
	const iedInfos = ucci.IEDCommInfos()

	return iedInfos
}