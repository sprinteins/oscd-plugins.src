import type { IEDConnection, IEDConnectionWithCustomValues, IEDNode } from "../../components/diagram"
import { selectIEDNode, selectConnection } from "./_store-view-filter/selected-filter-store-functions"

export const config = {
	width:  200,
	height: 30,
	// heightPerConnection: 20,
}

export function handleIEDClick(e: CustomEvent<IEDNode>) {
	selectIEDNode(e.detail)
}
export function handleConnectionClick(e: CustomEvent<IEDConnection>) {
	// temp till fully migrated: map element to enhanced data model
	const selectedConnection = e.detail as IEDConnectionWithCustomValues
	selectConnection(selectedConnection)
}