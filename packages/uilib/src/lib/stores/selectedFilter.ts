import type { ElkNode } from "elkjs/lib/elk-api";
import { writable } from 'svelte/store';

export type SelectedFilter = {
    selectedIED: ElkNode | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
}

export const selectedIEDNode = writable<SelectedFilter>(undefined);