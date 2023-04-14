<script lang="ts">
	import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
	import { calculateLayout } from "./node-layout"
	import Theme from "../../style/theme.svelte"
	import Diagram from "./diagram.svelte"
  	import type { ElkNode } from "elkjs/lib/elk-api";

	export let root: Element
	
	const config = {
		width:  200,
		height: 30,
	}

	let rootNode: Promise<ElkNode>
	async function initInfos(root: Element){
		if(!root){
			console.log({level:"dev", msg:"initInfos: no root"})
			return
		}
		console.log({level:"dev", msg:"creating infos"})
		const scdQueries = new SCDQueries(root)
		const ucci = new UCCommunicationInformation(scdQueries)
		const iedInfos = ucci.IEDCommInfos()
		console.log({level:"dev", msg:"iedinfos", iedInfos})

		rootNode = calculateLayout(iedInfos, config)
		rootNode.then( (v) => console.log({level:"dev", msg:"initinfos", rootNode:v}) )
	}
	$: initInfos(root)
	$: console.log({level:"dev", msg:"new document", root})

</script>

<svelte:options tag="tscd-communication-explorer" />

<Theme />
<span class="root">
	{#await rootNode then value}
		<Diagram rootNode={value} nodeWidth={config.width} nodeHeight={config.height} />
	{/await}
</span>
