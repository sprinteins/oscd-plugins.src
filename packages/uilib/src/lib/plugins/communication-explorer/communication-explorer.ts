import { SCDQueries, UCCommunicationInformation } from "@oscd-plugins/core"
import type { IEDConnection, IEDNode, RootNode } from "../../components/diagram"
import { calculateLayout } from "./node-layout"
import type { SelectedFilter } from "./selected-filter-store"
import { selectIEDNode, selectConnection } from "./selected-filter-store-functions"

export const config = {
	width:  200,
	height: 30,
	// heightPerConnection: 20,
}

export function handleIEDClick(e: CustomEvent<IEDNode>) {
	selectIEDNode(e.detail)
}
export function handleConnectionClick(e: CustomEvent<IEDConnection>) {
	selectConnection(e.detail)
}