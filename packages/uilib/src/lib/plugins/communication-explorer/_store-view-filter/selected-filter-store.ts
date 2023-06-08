import { writable } from "svelte/store"
import type { IEDConnectionWithCustomValues, IEDNode } from "../../../components/diagram"
import { allMessageTypes } from "@oscd-plugins/core"

export type SelectedFilter = {
    selectedIEDs: IEDNode[];
	selectedConnection: IEDConnectionWithCustomValues | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
    selectedMessageTypes: string[];
	hideIrrelevantStuff: boolean;
	showConnectionArrows: boolean;
	nameFilter: string;
}

export const defaultSelection: SelectedFilter = {
	selectedIEDs:       [],
	selectedConnection: undefined,
	
	incomingConnections: true,
	outgoingConnections: true,

	hideIrrelevantStuff: 	false,
	showConnectionArrows: true,
	nameFilter:          	"",
	selectedMessageTypes: [ ...allMessageTypes ],
}

export const selectedIEDNode = writable<SelectedFilter>(defaultSelection)
