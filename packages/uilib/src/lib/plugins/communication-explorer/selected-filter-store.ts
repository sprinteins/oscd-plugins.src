import { writable } from "svelte/store"
import type { IEDConnection, IEDNode } from "../../components/diagram"
import { allMessageTypes } from "@oscd-plugins/core"

export type SelectedFilter = {
    selectedIED: IEDNode | undefined;
	selectedConnection: IEDConnection | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
    selectedMessageTypes: string[];
	hideIrrelevantStuff: boolean;
	nameFilter: string;
}

export const defaultSelection: SelectedFilter = {
	selectedIED:        undefined,
	selectedConnection: undefined,
	
	incomingConnections: true,
	outgoingConnections: true,

	hideIrrelevantStuff: 	false,
	nameFilter:          	"",
	selectedMessageTypes: [ ...allMessageTypes ],
}

export const selectedIEDNode = writable<SelectedFilter>(defaultSelection)
