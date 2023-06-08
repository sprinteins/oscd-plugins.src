<script lang="ts">
    import { calculateLayout } from "../_func-layout-calculation/node-layout"
    import { Diagram, type IEDConnection, type IEDConnectionWithCustomValues, type IEDNode, type RootNode } from "../../../components/diagram"
    import { Sidebar } from "../sidebar"
    import { getIEDs } from "../_func-layout-calculation/get-ieds"
    import {
    	selectedIEDNode,
    	type SelectedFilter,
    	selectConnection,
    	selectIEDNode,
    	clearIEDSelection,
    } from "../_store-view-filter"

    export let root: Element
    export let showSidebar = true

    let rootNode: RootNode | undefined = undefined
    $: initInfos(root, $selectedIEDNode)

    // Note: maybe have a mutex if there are too many changes
    export async function initInfos(
    	root: Element,
    	selectedFilter: SelectedFilter
    ) {
    	if (!root) {
    		console.info({ level: "info", msg: "initInfos: no root" })
    		return []
    	}

    	const iedInfos = getIEDs(root)
    	rootNode = await calculateLayout(iedInfos, config, selectedFilter)
    }

    export const config = {
    	width:  150,
    	height: 40,
    	// heightPerConnection: 20,
    }

    export function handleIEDClick(e: CustomEvent<IEDNode>) {
    	selectIEDNode(e.detail)
    }
    export function handleConnectionClick(e: CustomEvent<IEDConnection>) {
    	// temp till fully migrated: map element to enhanced data model
    	const selectedConnection = e.detail as IEDConnectionWithCustomValues
    	selectConnection(selectedConnection)
    }
    export function handleClearClick() {
    	clearIEDSelection()
    }

</script>

<div class="root" class:showSidebar>
    {#if rootNode}
        <Diagram
            {rootNode}
            on:iedclick={handleIEDClick}
            on:connectionclick={handleConnectionClick}
            on:clearclick={handleClearClick}
            selectedIedIDs={$selectedIEDNode.selectedIEDs?.map(ied => ied.id)}
            selectedConnectionID={$selectedIEDNode?.selectedConnection?.id}
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
