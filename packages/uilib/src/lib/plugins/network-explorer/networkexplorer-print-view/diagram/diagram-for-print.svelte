<svelte:options tag="tscd-communication-explorer" />

<script lang="ts">
    import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
    import { Diagram, type RootNode } from "../../../../components/diagram"
    import {
    	selectedIEDNode,
    	type SelectedFilter,
    	handleIEDClick,
    	handleConnectionClick,
    	config,
    	calculateLayout,
    } from "../../../communication-explorer"
    import css from "../../../communication-explorer/communication-explorer.css?inline"

    export let root: Element

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

<svelte:element this="style">{@html css}</svelte:element>

<communication-explorer>
    <div class="root">
        {#if rootNode}
            <Diagram
                {rootNode}
                on:iedclick={handleIEDClick}
                on:connectionclick={handleConnectionClick}
                selectedIedID={$selectedIEDNode.selectedIED?.id}
                selectedConnectionID={$selectedIEDNode?.selectedConnection?.id}
            />
        {/if}
    </div>
</communication-explorer>
