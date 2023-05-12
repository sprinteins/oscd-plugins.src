

<script lang="ts">
	import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
	import { calculateLayout } from "./node-layout"
	import Theme from "../../style/theme.svelte"
	import {
		Diagram,
		type IEDConnection,
		type IEDNode,
		type RootNode,
	} from "../../components/diagram"
	import {
		selectedIEDNode,
		selectIEDNode,
		type SelectedFilter,
		selectConnection,
	} from "./"
	import { Sidebar } from "./sidebar"

	export let root: Element

	const config = {
		width:  200,
		height: 30,
		// heightPerConnection: 20,
	}

	let rootNode: RootNode | undefined = undefined
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

	//
	// Actions
	//
	function handleIEDClick(e: CustomEvent<IEDNode>) {
		selectIEDNode(e.detail)
	}
	function handleConnectionClick(e: CustomEvent<IEDConnection>) {
		selectConnection(e.detail)
	}

	$: initInfos(root, $selectedIEDNode)
</script>

<Theme />
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
			<Sidebar {rootNode} />
		{/if}
	</div>
</communication-explorer>


<style>
	communication-explorer {
		display: block;
		position: relative;
		font-size: 12px;
		min-height: 80vh
	}

	.root {
		display: grid;
		grid-template-columns: auto var(--sidebar-width);
		background-color: #ffffff;
		height: calc(100vh - 128px);
		width: 100%;
		overflow-x: hidden;
	}
</style>