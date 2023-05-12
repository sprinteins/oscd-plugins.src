

<script lang="ts">
    import {
    	selectedIEDNode,
    	type SelectedFilter,
    } from "../selected-filter-store"
    import {
    	selectIEDNode,
    	clearSelection,
    	setHideIrrelevantStuff,
    	setNameFilter,
    } from "../selected-filter-store-functions"
    import ConnectionSelector from "./assets/connection-selector.svg"
    import css from "./sidebar.css?inline"
    import type { IEDNode, RootNode } from "../../../components/diagram"
    import { ConnectionTypeFilter } from "./connection-type-filter"
    import { MessageTypeFilter } from "./message-type-filter"

    export let rootNode: RootNode

    $: IEDSelection = $selectedIEDNode?.selectedIED?.id ?? ""
    $: ConnectionSelection = $selectedIEDNode.selectedConnection
    $: selectedMessageTypes = $selectedIEDNode.selectedMessageTypes
    $: showIncomingConnections = $selectedIEDNode?.incomingConnections
    $: showOutgoingConnections = $selectedIEDNode?.outgoingConnections
    $: isIedFiltersDisabled =
        $selectedIEDNode?.selectedConnection !== undefined
    $: isConnectionDirectionDisabled = handleConnectionDirectionDisabled(
    	$selectedIEDNode,
    	isIedFiltersDisabled
    )

    let selectedNode: IEDNode | undefined

    function handleConnectionDirectionDisabled(
    	filter: SelectedFilter,
    	iedFilterDisabled: boolean
    ): boolean {
    	if (iedFilterDisabled) return true

    	const selectedIED = filter?.selectedIED?.id
    	const selectedCon = filter?.selectedConnection?.id

    	return Boolean(selectedIED === undefined && selectedCon === undefined)
    }

    function setSelectedNode(e: Event) {
    	const target = e.target as HTMLSelectElement
    	selectedNode = rootNode.children.find(
    		(node) => node.id === target.value
    	)
    	if (selectedNode) {
    		selectIEDNode(selectedNode)
    	}
    }

    function handleHideIrrelevantStuffChange(e: Event) {
    	const target = e.target as HTMLInputElement
    	setHideIrrelevantStuff(target.checked)
    }

    function handleNameFilterChange(e: Event) {
    	const target = e.target as HTMLInputElement
    	setNameFilter(target.value)
    }
</script>

<div class="sidebar sidebar-right">
    <div class="sidebar-content">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="actions">
            <a class="clear-all" on:click={clearSelection}> Clear all </a>
        </div>

        <div class="ied-nodes">
            <img src={ConnectionSelector} alt="connection selector" />
            <label>
                <span>Select an IED</span>
                <select value={IEDSelection} on:change={setSelectedNode}>
                    <option value="" disabled>Select a IED</option>
                    {#if rootNode && rootNode.children && rootNode.children.length >= 0}
                        {#each rootNode.children as node}
                            <option
                                selected={IEDSelection === node.id}
                                value={node.id}
                                >{node.label}
                            </option>
                        {/each}
                    {/if}
                </select>
            </label>
        </div>

        <ConnectionTypeFilter
            bind:showIncomingConnections
            bind:showOutgoingConnections
            connectionDirectionDisabled={isConnectionDirectionDisabled}
        />

        <hr />

        <MessageTypeFilter
            {selectedMessageTypes}
            filterDisabled={isIedFiltersDisabled}
        />

        <hr />

        <table>
            <tr>
                <td>ID:</td>
                <td>{ConnectionSelection?.id ?? ""}</td>
            </tr>
            <tr>
                <td>Sources:</td>
                <td>{ConnectionSelection?.sourceIED?.iedName ?? ""}</td>
            </tr>
            <tr>
                <td>Targets:</td>
                <td>{ConnectionSelection?.targetIED?.iedName ?? ""}</td>
            </tr>
            <tr>
                <td>MessageType:</td>
                <td>{ConnectionSelection?.messageType ?? ""}</td>
            </tr>
        </table>

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
            <input
                type="text"
                placeholder="e.g.: XAT"
                value={$selectedIEDNode.nameFilter}
                on:input={handleNameFilterChange}
            />
        </label>

        <svelte:element this="style">{@html css}</svelte:element>
    </div>
</div>
