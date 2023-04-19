<script lang="ts">
	import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
	import { calculateLayout } from "./node-layout"
	import Theme from "../../style/theme.svelte"
	import Diagram from "./diagram.svelte"
  	import type { ElkNode } from "elkjs/lib/elk-api";
    import Sidebar from "../../components/sidebar/sidebar.svelte";
	import {selectedIEDNode, type SelectedFilter} from "../../stores/selectedFilter"

	export let root: Element

	const config = {
		width:  200,
		height: 30,
	}

	let rootNode: Promise<ElkNode>
	async function initInfos(root: Element, selectedFilter: SelectedFilter){
		if(!root){
			console.log({level:"dev", msg:"initInfos: no root"})
			return
		}
		console.log({level:"dev", msg:"creating infos"})
		const scdQueries = new SCDQueries(root)
		const ucci = new UCCommunicationInformation(scdQueries)
		const iedInfos = ucci.IEDCommInfos()
		console.log({level:"dev", msg:"iedinfos", iedInfos})

		rootNode = calculateLayout(iedInfos, config, selectedFilter)
		rootNode.then( (v) => console.log({level:"dev", msg:"initinfos", rootNode:v}) )
	}
	
	// reactive regeneration on startup + when selectedIEDNode changes
	$: initInfos(root, $selectedIEDNode)

	$: console.log({level:"dev", msg:"new document", root})

</script>
<svelte:options tag="tscd-communication-explorer" />

<Theme />
<div style="position: relative; font-size: 12px; min-height: 80vh;">
	<span class="root">
		{#await rootNode then value}
			{#if $selectedIEDNode?.selectedIED != undefined}
				<Sidebar rootNode={value} />
			{/if}
			<Diagram rootNode={value} nodeWidth={config.width} nodeHeight={config.height} />
		{/await}
	</span>
</div>
