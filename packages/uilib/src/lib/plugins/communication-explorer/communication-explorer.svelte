<svelte:options tag="tscd-communication-explorer" />

<script lang="ts">

	import { UCCommunicationInformation, SCDQueries } from "@oscd-plugins/core"
	import { calculateLayout } from "./node-layout"
	import Theme from "../../style/theme.svelte"
	import { Diagram, type IEDNode, type RootNode } from "../../components/diagram"	
	import {selectedIEDNode, selectNode, type SelectedFilter} from "./"
	import css from "./communication-explorer.css?inline"
    import { Sidebar } from "./sidebar";

	export let root: Element;

	const config = {
		width: 200,
		height: 30,
	};

	let rootNode: Promise<RootNode>;
	async function initInfos(root: Element, selectedFilter: SelectedFilter) {
		if (!root) {
			console.info({ level: "info", msg: "initInfos: no root" });
			return;
		}
		const scdQueries = new SCDQueries(root);
		const ucci = new UCCommunicationInformation(scdQueries);
		const iedInfos = ucci.IEDCommInfos();

		rootNode = calculateLayout(iedInfos, config, selectedFilter);
	}

	//
	// Actions
	//
	function handleIEDClick(e: CustomEvent<IEDNode>) {
		selectNode(e.detail);
	}

	$: initInfos(root, $selectedIEDNode);
</script>

<svelte:element this="style">{@html css}</svelte:element>

<Theme />
<communication-explorer>
	<span class="root">
		{#await rootNode then value}
			<Sidebar rootNode={value} />
			<Diagram
				rootNode={value}
				on:iedclick={handleIEDClick}
				selectedIEDID={$selectedIEDNode.selectedIED?.id ?? ""}
			/>
		{/await}
	</span>
</communication-explorer>
