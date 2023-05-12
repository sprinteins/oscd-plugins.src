<script lang="ts">
    import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
    import { calculateLayout } from "./node-layout"
    import { Diagram, type RootNode } from "../../components/diagram"
    import {
    	selectedIEDNode,
    	type SelectedFilter,
    	handleIEDClick,
    	handleConnectionClick,
    	config,
    } from "./"
    import { Sidebar } from "./sidebar"

    export let root: Element
    export let showSidebar = true

    let rootNode: RootNode | undefined = undefined
    $: initInfos(root, $selectedIEDNode)

    // Note: maybe have a mutex if there are too many changes
    async function initInfos(root: Element, selectedFilter: SelectedFilter) {
    	if (!root) {
    		console.info({ level: "info", msg: "initInfos: no root" })
    		return
    	}
    	const scdQueries = new SCDQueries(root)
    	const ucci = new UCCommunicationInformation(scdQueries)
    	const iedInfos = ucci.IEDCommInfos()

    	rootNode = await calculateLayout(iedInfos, config, selectedFilter)
    }
</script>

<div class="root" class:showSidebar>
    {#if rootNode}
        <Diagram
            {rootNode}
            on:iedclick={handleIEDClick}
            on:connectionclick={handleConnectionClick}
            selectedIedID={$selectedIEDNode.selectedIED?.id}
            selectedConnectionID={$selectedIEDNode?.selectedConnection?.id}
        />
        {#if showSidebar}
            <Sidebar {rootNode} />
        {/if}
    {/if}
</div>

<style>
    .root {
        display: grid;
        grid-template-columns: auto 0;
        background-color: #ffffff;
        height: calc(100vh - 128px);
        width: 100%;
        overflow-x: hidden;
    }

    .root.showSidebar {
        grid-template-columns: auto var(--sidebar-width);
    }
</style>
