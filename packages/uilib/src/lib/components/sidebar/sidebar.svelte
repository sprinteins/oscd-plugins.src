<script lang="ts">
    import ConnectionSelector from "./assets/connection-selector.svg";
    import css from './sidebar.css?inline';
    import type { ElkNode } from "elkjs/lib/elk-api";
    import {selectedIEDNode} from "../../stores/selectedFilter"
    import { onDestroy } from "svelte";

    export let rootNode: ElkNode

    let selectValue: string = ""
    let showIncomingConnections: boolean = true
    let showOutgoingConnections: boolean = true
    let showSelectAtLeastOneConnectionDirectionMessage: boolean = false

    function setSelectedNode() {
         rootNode.children?.find((value: ElkNode) => {
            if (value.id == selectValue) {
                selectedIEDNode.update(selected => {
                    selected.selectedIED = value
                    return selected
                })
            }
        })
    }

    function clearSelection() {
        selectedIEDNode.update(value => {
            value.incomingConnections = true
            value.outgoingConnections = true
            value.selectedIED = undefined
            return value
        })
    }

    function changeConnectionDirection() {
        selectedIEDNode.update(value => {
            value.incomingConnections = showIncomingConnections
            value.outgoingConnections = showOutgoingConnections
            return value
        })

        if (!showIncomingConnections && !showOutgoingConnections) {
            showSelectAtLeastOneConnectionDirectionMessage = true
        } else {
            showSelectAtLeastOneConnectionDirectionMessage = false
        }
    }

    const unsubscribe = selectedIEDNode.subscribe(value => {
        showIncomingConnections = value?.incomingConnections
        showOutgoingConnections = value?.outgoingConnections
        selectValue = value?.selectedIED?.id ?? ""
    })
    onDestroy(unsubscribe)

</script>

<svelte:options tag="tscd-sidebar" />

<div class="sidebar sidebar-right">
    <div class="sidebar-content">

        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a on:click={clearSelection}>
            <button>Clear all</button>
        </a>

        <div class="ied-nodes">
            <img src={ConnectionSelector} alt="connection selector">
            <label>
                <span>Show Connections</span>
                <select bind:value={selectValue} on:change={setSelectedNode}>
                    <option value="" disabled>Select a Node</option>
                    {#if rootNode && rootNode.children}
                        {#each rootNode.children as node}
                            <option selected={selectValue === node.id} value={node.id}>{node.id}</option>
                        {/each}
                    {/if}
                </select>
            </label>
        </div>

        <hr>
    
        <div class="connection-type">
            <label>
                <input type="checkbox" bind:checked={showIncomingConnections} on:change={changeConnectionDirection}>
                <span>Incoming Connection</span>
            </label>
            <label>
                <input type="checkbox" bind:checked={showOutgoingConnections} on:change={changeConnectionDirection}>
                <span>Outgoing Connection</span>
            </label>
            {#if !showIncomingConnections && !showOutgoingConnections}
                <span>*You have to select at least one</span>
            {/if}
        </div>

        <!-- <hr> -->

    </div>

    <svelte:element this="style">{@html css}</svelte:element>
</div>
