import type { IEDCommInfo } from "@oscd-plugins/core"
import { getAllIEDsFromBay } from "."

export function calcPublished(iedName: string, iedByBay: Map<string, IEDCommInfo[]>): string[] {
	const publishedServiceTypes: string[] = []

	for (const checkIed of getAllIEDsFromBay(iedByBay)) {
		for (const received of checkIed.received) {
			if (received.iedName === iedName) {
				publishedServiceTypes.push(received.serviceType)
			}
		}
	}

	// make entries unique before returning them
	return [...new Set(publishedServiceTypes)]
}