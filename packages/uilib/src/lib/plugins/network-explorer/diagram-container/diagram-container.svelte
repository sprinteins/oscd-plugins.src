<script lang="ts">
import { extractIEDInfos, extractIEDInfosWithBay } from "../_func-layout-calculation/get-ieds"
import { calculateLayout } from "../_func-layout-calculation/node-layout"
    import Diagram from "./diagram.svelte";

export let root: Element

let rootNode: RootNode | undefined = undefined
$: initInfos(root)

async function initInfos(
	root: Element
) {
	if (!root) {
		console.info({ level: "info", msg: "initInfos: no root" })
		return []
	}
		
	const iedInfos = extractIEDInfosWithBay(root)
	rootNode = await calculateLayout(iedInfos)
	console.log({level:"dev", iedInfos, rootNode})
}
</script>


<div class="root">
	{#if rootNode}
		<Diagram nodes={[]} />
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
