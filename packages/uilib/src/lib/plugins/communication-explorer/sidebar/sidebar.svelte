<script lang="ts">
    import {
    	selectedIEDNode,
    	type SelectedFilter,
    } from "../_store-view-filter/selected-filter-store"
    import {
    	selectIEDNode,
    	clearSelection,
    	setNameFilter,
    } from "../_store-view-filter/selected-filter-store-functions"
    import ConnectionSelector from "./assets/connection-selector.svg"
    import type { IEDNode, RootNode } from "../../../components/diagram"
    import { ConnectionTypeFilter } from "./connection-type-filter"
    import { MessageTypeFilter } from "./message-type-filter"
    import ConnectionInformation from "./connection-information/connection-information.svelte"
    import IEDAccordion from "./ied-accordion/ied-accordion.svelte"
    import { preferences$ } from "../_store-preferences"

    export let rootNode: RootNode

    $: IEDSelectionIDs = $selectedIEDNode?.selectedIEDs.map((ied) => ied.id)
    $: IEDSelections = $selectedIEDNode?.selectedIEDs
    $: ConnectionSelection = $selectedIEDNode.selectedConnection
    $: selectedMessageTypes = $selectedIEDNode.selectedMessageTypes
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

    	const selectedIEDs = filter?.selectedIEDs
    	const selectedCon = filter?.selectedConnection?.id

    	return Boolean(selectedIEDs.length === 0 && selectedCon === undefined)
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

    function handleNameFilterChange(e: Event) {
    	const target = e.target as HTMLInputElement
    	setNameFilter(target.value)
    }
</script>

<div class="sidebar sidebar-right">
    <div class="sidebar-content">
        <!-- svelte-ignore a11y-missing-attribute -->
        <div class="actions">
            <a class="clear-all" on:keypress on:click={clearSelection}>
                Clear all
            </a>
        </div>

        <div class="ied-nodes">
            <img src={ConnectionSelector} alt="connection selector" />
            <label>
                <span>Select an IED</span>
                <!-- 
                    TODO: we should remove this select
                    I don't think it adds much user value
                    and it is going to be hard to support
                -->
                <select
                    value={IEDSelectionIDs[0] ?? ""}
                    on:change={setSelectedNode}
                >
                    <option value="" disabled>Select a IED</option>
                    {#if rootNode && rootNode.children && rootNode.children.length >= 0}
                        {#each rootNode.children as node}
                            <option
                                selected={(IEDSelectionIDs[0] ?? "") ===
                                    node.id}
                                value={node.id}
                                >{node.label}
                            </option>
                        {/each}
                    {/if}
                </select>
            </label>
        </div>

        <div class="centered">
            <ConnectionTypeFilter disabled={isConnectionDirectionDisabled} />
        </div>

        <hr />
        <MessageTypeFilter
            {selectedMessageTypes}
            filterDisabled={isIedFiltersDisabled}
        />

        {#if IEDSelections.length > 0}
            <hr />
            <ul class="ied-detail-list">
                {#each IEDSelections as IEDSelections}
                    <li>
                        <IEDAccordion IEDSelection={IEDSelections} {rootNode} />
                    </li>
                {/each}
            </ul>
        {/if}

        {#if ConnectionSelection !== undefined}
            <hr />
            <ConnectionInformation {ConnectionSelection} />
        {/if}

        <hr />

        <h2>Focus Mode</h2>

        <label class="ied-search">
            <span class="ied-search-headline">Filter IEDs by name:</span>
            <input
                class="input"
                type="text"
                placeholder="e.g.: XAT"
                value={$selectedIEDNode.nameFilter}
                on:input={handleNameFilterChange}
            />
        </label>

        <div class="checkbox-group">
            <label>
                <input
                    type="checkbox"
                    bind:checked={$preferences$.isFocusModeOn}
                />
                <span>Focus on selected IEDs</span>
            </label>
        </div>

        <h2>Preferences</h2>

        <div class="arrows-visible">
            <label>
                <input
                    type="checkbox"
                    bind:checked={$preferences$.showConnectionArrows}
                />
                <span>Show arrows on connections</span>
            </label>
        </div>

        <div class="checkbox-group">
            <label>
                <input
                    type="checkbox"
                    bind:checked={$preferences$.playConnectionAnimation}
                />
                <span>Play data flow animation</span>
            </label>
        </div>
    </div>
</div>

<style>
    hr {
        margin: 2rem 0;
    }

    .sidebar {
        height: 100%;
        width: var(--sidebar-width);
        overflow: hidden;
    }

    .sidebar .sidebar-content {
        padding: 1rem;
        background-color: #fcf6e5;
        height: calc(100% - 2rem);
        overflow: auto;
        min-width: 330px;
    }

    .ied-nodes {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .ied-nodes img {
        margin-top: 0.9rem;
        height: 1.3rem;
        width: 1.3rem;
    }

    .ied-nodes label {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-grow: 1;
        max-width: 80%;
    }

    .ied-nodes select {
        width: 100%;
        padding: 0.5rem 1rem;
    }

    .actions {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 1rem;
    }

    .actions .clear-all {
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 5px;
        padding: 6px 8px;
        transition: border-color 200ms ease-in-out;
    }

    .actions .clear-all:hover {
        border-color: var(--color-text-disabled-1);
    }

    .centered {
        display: flex;
        justify-content: center;
    }

    .ied-detail-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .ied-search {
        display: inline-grid;
    }

    .ied-search-headline {
        margin-bottom: 0.5rem;
    }
    .input {
        margin-bottom: 1rem;
    }
</style>
