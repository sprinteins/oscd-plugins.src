import type { IEDNetworkInfo } from "@oscd-plugins/core"
import { UCNetworkInformation, SCDQueries } from "@oscd-plugins/core"

export function extractIEDInfos(root: Element): IEDNetworkInfo[] {
	if (!root) {
		console.info({ level: "info", msg: "initInfos: no root" })
		return []
	}
	const scdQueries = new SCDQueries(root)
	const ucni = new UCNetworkInformation(scdQueries)
	const iedInfos = ucni.IEDNetworkInfo()
	
	return iedInfos
}

export function extractIEDInfosWithBay(root: Element): Map<string, IEDNetworkInfo[]> {
	if (!root) {
		console.info({ level: "info", msg: "initInfos: no root" })
		return new Map()
	}
	const scdQueries = new SCDQueries(root)
	const ucni = new UCNetworkInformation(scdQueries)
	const iedInfosByBay = ucni.IEDNetworkInfosByBay()

	return iedInfosByBay
}
