<svelte:options tag="tscd-communication-explorer" />

<script lang="ts">

	import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
	import { calculateLayout } from "./node-layout"
	import Theme from "../../style/theme.svelte"
	import { Diagram, type IEDConnection, type IEDNode, type RootNode } from "../../components/diagram"	
	import {selectedIEDNode, selectIEDNode, type SelectedFilter, selectConnection} from "./"
	import css from "./communication-explorer.css?inline"
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
		console.log("IED: ", $selectedIEDNode.selectedIED, " Connection: ", $selectedIEDNode.selectedConnection);
	}
	function handleConnectionClick(e: CustomEvent<IEDConnection>) {
		selectConnection(e.detail);
		console.log("IED: ", $selectedIEDNode.selectedIED, " Connection: ", $selectedIEDNode.selectedConnection);
	}

	$: initInfos(root, $selectedIEDNode)
</script>

<svelte:element this="style">{@html css}</svelte:element>

<Theme />
<communication-explorer>
	<div class="root">
		{#if rootNode}
			<Diagram
				rootNode={rootNode}
				on:iedclick={handleIEDClick}
				on:connectionClick={handleConnectionClick}
				selectedIEDID={$selectedIEDNode.selectedIED?.id ?? ""}
			/>
			<Sidebar rootNode={rootNode} />
		{/if}
	</div>
</communication-explorer>
