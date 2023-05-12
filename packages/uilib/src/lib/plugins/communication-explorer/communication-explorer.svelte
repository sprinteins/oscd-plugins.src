<svelte:options tag="tscd-communication-explorer" />

<script lang="ts">
	import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
	import { calculateLayout } from "./node-layout"
	import Theme from "../../style/theme.svelte"
	import { Diagram, type RootNode } from "../../components/diagram"
	import {
		selectedIEDNode,
		type SelectedFilter,
		handleIEDClick,
		handleConnectionClick,
		config,
	} from "./"
	import css from "./communication-explorer.css?inline"
	import { Sidebar } from "./sidebar"

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
