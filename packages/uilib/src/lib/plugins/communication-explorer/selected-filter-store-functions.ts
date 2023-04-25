import type { IEDNode } from "../../components/diagram";
import { MessageType } from "@oscd-plugins/core"
import { selectedIEDNode } from "./"

export function selectNode(node: IEDNode) {
    selectedIEDNode.update(selectedFilter => {
        return {
            ...selectedFilter,
            selectedIED: node,
        }
    })
}

export function clearSelection() {
    selectedIEDNode.set({
        incomingConnections: true,
        outgoingConnections: true,
        selectedMessageTypes: [],
        selectedIED: undefined,
    });
}

export function changeMessageConnectionFilterDirection(incoming: boolean, outgoing: boolean) {
    selectedIEDNode.update((value) => {
        return {
            ...value,
            incomingConnections: incoming,
            outgoingConnections: outgoing,
        };
    });
}

function addOrRemoveMessageType(list: string[], messageType: string, checked: boolean): string[] {
    if (checked) {

        if (!list.includes(messageType)) 
            { list.push(messageType) }
        return list
    }

    return list.filter((item) => item !== messageType)
}

export function setSelectedMessageTypes(name: string, state: boolean, oldList?: string[]) {
    if (oldList === undefined) { oldList = [] }
    let updatedList: string[] = [];

    if      (name === MessageType.GOOSe)         { updatedList = addOrRemoveMessageType(oldList, MessageType.GOOSe,         state) }
    else if (name === MessageType.MMS)           { updatedList = addOrRemoveMessageType(oldList, MessageType.MMS,           state) }
    else if (name === MessageType.Reports)       { updatedList = addOrRemoveMessageType(oldList, MessageType.Reports,       state) }
    else if (name === MessageType.SampledValues) { updatedList = addOrRemoveMessageType(oldList, MessageType.SampledValues, state) }
    
    selectedIEDNode.update((value) => {
        return {
            ...value, 
            selectedMessageTypes: updatedList,
        };
    })
}
