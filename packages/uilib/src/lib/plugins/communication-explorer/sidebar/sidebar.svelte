<svelte:options tag="tscd-sidebar" />

<script lang="ts">
    import { selectedIEDNode } from "../"
    import ConnectionSelector from "./assets/connection-selector.svg"
    import css from "./sidebar.css?inline"
    import { selectNode, clearSelection, changeMessageConnectionFilterDirection } from "../"
    import type { IEDNode, RootNode } from "../../../components/diagram"
    import MessageTypeFilter from "./message-type-filter/message-type-filter.svelte"

    export let rootNode: RootNode

    let selectValue: string                 = $selectedIEDNode?.selectedIED?.id ?? ""
    let showIncomingConnections: boolean    = $selectedIEDNode?.incomingConnections
    let showOutgoingConnections: boolean    = $selectedIEDNode?.outgoingConnections

    let selectedNode: IEDNode | undefined

    function setSelectedNode(e: Event) {
    	const target = e.target as HTMLSelectElement
    	selectedNode = rootNode.children.find(node => node.id === target.value)
    	if (selectedNode) {
    		selectNode(selectedNode)
    	}
    }

    function changeConnectionDirection() {
    	changeMessageConnectionFilterDirection(showIncomingConnections, showOutgoingConnections)
    }

</script>

<div class="sidebar sidebar-right">
    <div class="sidebar-content">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="actions">
            <a class="clear-all" on:click={clearSelection}>
                Clear all
            </a>
        </div>

        <div class="ied-nodes">
            <img src={ConnectionSelector} alt="connection selector" />
            <label>
                <span>Show Connections</span>
                <select value={selectValue} on:change={setSelectedNode}>
                    <option value="" disabled>Select a Node</option>
                    {#if rootNode && rootNode.children}
                        {#each rootNode.children as node}
                            <option
                                selected={selectValue === node.id}
                                value={node.id}>{node.label}
                            </option>
                        {/each}
                    {/if}
                </select>
            </label>
        </div>

        <hr />

        <div class="connection-type">
            <label>
                <input
                    type="checkbox"
                    bind:checked={showIncomingConnections}
                    on:change={changeConnectionDirection}
                />
                <span>Incoming Connection</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    bind:checked={showOutgoingConnections}
                    on:change={changeConnectionDirection}
                />
                <span>Outgoing Connection</span>
            </label>
            {#if !showIncomingConnections && !showOutgoingConnections}
                <span>*You have to select at least one</span>
            {/if}
        </div>

        <hr />

        <MessageTypeFilter />

    <svelte:element this="style">{@html css}</svelte:element>
    </div>
</div>
