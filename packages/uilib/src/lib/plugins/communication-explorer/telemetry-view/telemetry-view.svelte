<script lang="ts">
	import { calculateLayout } from "../_func-layout-calculation/node-layout"
	import { Diagram, type IEDConnection, type IEDConnectionWithCustomValues, type IEDNode, type RootNode } from "../../../components/diagram"
	import DiagramV2 from "../../../components/diagram/diagram-v2.svelte"
	import { Sidebar } from "../sidebar"
	import { extractIEDInfos } from "../_func-layout-calculation/get-ieds"
	import {
		filterState,
		type SelectedFilter,
		selectConnection,
		selectIEDNode,
		clearIEDSelection,
		toggleMultiSelectionOfIED,
	} from "../_store-view-filter"
	import type { Config } from "../_func-layout-calculation/config"
	import { preferences$, type Preferences  } from "../_store-preferences"
	import type { IEDCommInfo } from "@oscd-plugins/core"
    import { Position, type Edge, type Node } from "@xyflow/svelte";
    import { generateIEDLayout } from "../_func-layout-calculation/node-layout-ieds";
	
	export let root: Element
	export let showSidebar = true
	
	let rootNode: RootNode | undefined = undefined
	let nodes: Node[] = []
	let edges: Edge[] = []

	$: initInfos(root, $filterState, $preferences$)
	let lastUsedRoot: Element | undefined = undefined
	let lastExtractedInfos: IEDCommInfo[] = []
	
	// Note: maybe have a mutex if there are too many changes
	async function initInfos(
		root: Element,
		selectedFilter: SelectedFilter,
		preferences: Preferences,
	) {
		if (!root) {
			console.info({ level: "info", msg: "initInfos: no root" })
			return []
		}
		
		if(root !== lastUsedRoot) {
			const iedInfos = extractIEDInfos(root)
			lastExtractedInfos = iedInfos
			lastUsedRoot = root
		}
		rootNode = await calculateLayout(lastExtractedInfos, config, selectedFilter, preferences)
		nodes = rootNode.children.map(child => {
			return {
				...child,
				position: {
					x: child.x!,
					y: child.y!,
				},
				data:{
					label: child.label,
				},
				targetPosition: Position.Top,
				sourcePosition: Position.Bottom,
			}
		})
		edges = rootNode.edges.map(edge => {
				return {
					id: edge.id,
					source: edge.sources[0],
					target: edge.targets[0],
					type: "smoothstep",
				}
		});
	}

	// TODO: extract
	

	$: console.log({level:"dev", rootNode})
	
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
		<!-- <Diagram
			{rootNode}
			playAnimation={$preferences$.playConnectionAnimation}
			showConnectionArrows={$preferences$.showConnectionArrows}
			on:iedselect={handleIEDSelect}
			on:iedadditiveselect={handleIEDAdditiveSelect}
			on:connectionclick={handleConnectionClick}
			on:clearclick={handleClearClick}
		/> -->
		<DiagramV2
			{nodes}
			{edges}
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
