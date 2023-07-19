import type { MessageType } from "@oscd-plugins/core"
import type { ServiceObject, ServiceTypeGroup } from "."
import type { ConnectedIED } from "../../_func-layout-calculation"

export function groupRelationsByServiceType( relations: ConnectedIED[] ): ServiceTypeGroup {

	const array: ServiceTypeGroup = new Map()
    
	relations.forEach((element) => {
		let serviceType: MessageType | "Unknown" | undefined = element.serviceType
		if (serviceType === undefined) { serviceType = "Unknown" }

		const keyName = `${element.serviceType}_${element.serviceTypeLabel}`
		const content: ServiceObject = {
			node:             element.node,
			serviceType:      serviceType,
			serviceTypeLabel: element.serviceTypeLabel,
		}

		const hasServiceTypeElement = array.has(keyName)
		if (!hasServiceTypeElement) {
			array.set(keyName, []) 
		}

		const serviceTypeElement = array.get(keyName)
		serviceTypeElement?.push(content)
	})
	return array
}