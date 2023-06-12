<script lang="ts">
    import { calculateLayout } from "../_func-layout-calculation/node-layout"
    import { Diagram, type IEDConnection, type IEDConnectionWithCustomValues, type IEDNode, type RootNode } from "../../../components/diagram"
    import { Sidebar } from "../sidebar"
    import { extractIEDInfos } from "../_func-layout-calculation/get-ieds"
    import {
    	selectedIEDNode,
    	type SelectedFilter,
    	selectConnection,
    	selectIEDNode,
    	clearIEDSelection,
    	toggleMultiSelectionOfIED,
    } from "../_store-view-filter"
    import type { Config } from "../_func-layout-calculation/config"

    export let root: Element
    export let showSidebar = true

    let rootNode: RootNode | undefined = undefined
    $: initInfos(root, $selectedIEDNode)

    // Note: maybe have a mutex if there are too many changes
    async function initInfos(
    	root: Element,
    	selectedFilter: SelectedFilter
    ) {
    	if (!root) {
    		console.info({ level: "info", msg: "initInfos: no root" })
    		return []
    	}

    	const iedInfos = extractIEDInfos(root)
    	rootNode = await calculateLayout(iedInfos, config, selectedFilter)
    }

    const config: Config = {
    	width:  150,
    	height: 40,
    	// spacingBetweenNodes: 100,
    	// spacingBase: 40,
    	// heightPerConnection: 20,
    }

    function handleIEDSelect(e: CustomEvent<IEDNode>) {
    	selectIEDNode(e.detail)
    }
    function handleIEDAdditiveSelect(e: CustomEvent<IEDNode>) {
    	toggleMultiSelectionOfIED(e.detail)
    }
    function handleConnectionClick(e: CustomEvent<IEDConnection>) {
    	// temp till fully migrated: map element to enhanced data model
    	const selectedConnection = e.detail as IEDConnectionWithCustomValues
    	selectConnection(selectedConnection)
    }
    function handleClearClick() {
    	clearIEDSelection()
    }

</script>

<div class="root" class:showSidebar>
    {#if rootNode}
        <Diagram
            {rootNode}
            on:iedselect={handleIEDSelect}
            on:iedadditiveselect={handleIEDAdditiveSelect}
            on:connectionclick={handleConnectionClick}
            on:clearclick={handleClearClick}
        />
        {#if showSidebar}
            <Sidebar {rootNode} />
        {/if}
    {/if}
</div>

<style>
    .root {
        --header-height: 128px;
        display: grid;
        grid-template-columns: auto 0;
        height: calc(100vh - var(--header-height));
        width: 100%;
        overflow-x: hidden;
    }

    .root.showSidebar {
        grid-template-columns: auto var(--sidebar-width);
    }
</style>
