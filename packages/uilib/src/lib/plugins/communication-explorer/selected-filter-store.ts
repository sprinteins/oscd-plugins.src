import { writable } from "svelte/store"
import type { IEDNode } from "../../components/diagram"
import { MessageType } from "@oscd-plugins/core"

export type SelectedFilter = {
    selectedIED: IEDNode | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
    selectedMessageTypes: string[];
	hideIrrelevantStuff: boolean;
	nameFilter: string;
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
	hideIrrelevantStuff: false,
	nameFilter:          "",
}

export const selectedIEDNode = writable<SelectedFilter>(defaultSelection)
