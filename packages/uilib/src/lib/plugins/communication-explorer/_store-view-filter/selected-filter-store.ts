import { writable } from "svelte/store"
import type { IEDConnectionWithCustomValues, IEDNode } from "../../../components/diagram"
import { allMessageTypes } from "@oscd-plugins/core"

export type SelectedFilter = {
    selectedIED: IEDNode | undefined;
	selectedConnection: IEDConnectionWithCustomValues | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
    selectedMessageTypes: string[];
	hideIrrelevantStuff: boolean;
	showConnectionArrows: boolean;
	nameFilter: string;
}

export const defaultSelection: SelectedFilter = {
	selectedIED:        undefined,
	selectedConnection: undefined,
	
	incomingConnections: true,
	outgoingConnections: true,

	hideIrrelevantStuff: 	false,
	showConnectionArrows: true,
	nameFilter:          	"",
	selectedMessageTypes: [ ...allMessageTypes ],
}

export const selectedIEDNode = writable<SelectedFilter>(defaultSelection)
