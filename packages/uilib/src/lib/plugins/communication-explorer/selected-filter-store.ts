import { writable } from "svelte/store"
import type { IEDNode } from "../../components/diagram"
import { MessageType } from "@oscd-plugins/core"

export type SelectedFilter = {
    selectedIED: IEDNode | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
    selectedMessageTypes: string[];
}

export const defaultSelection: SelectedFilter = {
	selectedIED:          undefined,
	incomingConnections:  true,
	outgoingConnections:  true,
	selectedMessageTypes: [
		MessageType.GOOSe,
		MessageType.MMS,
		MessageType.SampledValues,
	],
}

export const selectedIEDNode = writable<SelectedFilter>(defaultSelection)
