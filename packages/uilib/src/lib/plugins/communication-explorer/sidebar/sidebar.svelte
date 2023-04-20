<script lang="ts">
    import { selectedIEDNode } from "../selected-filter-store";
    import ConnectionSelector from "./assets/connection-selector.svg";
    import css from './sidebar.css?inline';
    import { onDestroy } from "svelte";
    import { selectNode } from "../selected-filter-store";
    import type { IEDNode, RootNode } from "../../../components/diagram";

    export let rootNode: RootNode

    let selectValue: string = ""
    let showIncomingConnections: boolean = true
    let showOutgoingConnections: boolean = true
    let showSelectAtLeastOneConnectionDirectionMessage: boolean = false

    function clearSelection() {
        selectedIEDNode.update(value => {
            value.incomingConnections = true
            value.outgoingConnections = true
            value.selectedIED = undefined
            return value
        })
    }

    let selectedNode: IEDNode | undefined
    function setSelectedNode(e: Event) {
        const target = e.target as HTMLSelectElement
        selectedNode = rootNode.children.find(node => node.id === target.value)
        if (selectedNode) {
            selectNode(selectedNode)
        }
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
                <select value={selectValue} on:change={setSelectedNode}>
                    <option value="" disabled>Select a Node</option>
                    {#if rootNode && rootNode.children}
                        {#each rootNode.children as node}
                            <option selected={selectValue === node.id} value={node.id}>{node.label}</option>
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
