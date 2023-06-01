import type { IEDCommInfo } from "@oscd-plugins/core"
import { getIEDs } from "../../communication-explorer/_func-layout-calculation"


export function calcIEDs(root: Element): IEDCommInfo[] {
	if (!root) {
		console.info({ level: "info", msg: "initInfos: no root" })
		return []
	}

	return getIEDs(root)
}
