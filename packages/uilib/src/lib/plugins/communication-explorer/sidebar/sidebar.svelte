<svelte:options tag="tscd-sidebar" />

<script lang="ts">

    import { selectedIEDNode } from "../selected-filter-store"
    import { 
        selectNode, 
        clearSelection, 
        changeMessageConnectionFilterDirection,
        setHideIrrelevantStuff,
        setNameFilter,
     } from "../selected-filter-store-functions"
    import ConnectionSelector from "./assets/connection-selector.svg"
    import css from "./sidebar.css?inline"
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

    function handleHideIrrelevantStuffChange(e: Event){
        const target = e.target as HTMLInputElement
        setHideIrrelevantStuff(target.checked)
    }

    function handleNameFilterChange(e: Event){
        const target = e.target as HTMLInputElement
        setNameFilter(target.value)
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

        <hr />
        <h2>Experiments</h2>
           
        <div class="checkbox-group">
            <label>
                <input 
                    type="checkbox" 
                    checked={$selectedIEDNode.hideIrrelevantStuff}
                    on:change={handleHideIrrelevantStuffChange}
                />
                <span>Hide irrelevant stuff</span>
            </label>
        </div>

        <label>
            <span>IED prefix search:</span>
            <input type="text"
                placeholder="e.g.: XAT"
                value={$selectedIEDNode.nameFilter}
                on:input={handleNameFilterChange}
            />
        </label>

    <svelte:element this="style">{@html css}</svelte:element>
    </div>
</div>
