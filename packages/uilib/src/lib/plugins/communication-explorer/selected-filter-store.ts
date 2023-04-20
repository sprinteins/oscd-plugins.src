import type { ElkNode } from "elkjs/lib/elk-api";
import { writable } from 'svelte/store';
import type { IEDNode } from "../../components/diagram";

export type SelectedFilter = {
    selectedIED: IEDNode | undefined;
    incomingConnections: boolean;
    outgoingConnections: boolean;
}

const defaultSelection: SelectedFilter = {
    selectedIED: undefined,
    incomingConnections: true,
    outgoingConnections: true,
}

export const selectedIEDNode = writable<SelectedFilter>(defaultSelection);

export function selectNode(node: IEDNode) {
    selectedIEDNode.update(selectedFilter => {
        return {
            ...selectedFilter,
            selectedIED: node,
        }
    }) 
}
