<script lang="ts">
    import { Diagram, type RootNode } from "../../../components/diagram"
import { extractIEDInfos, extractIEDInfosWithBay } from "../_func-layout-calculation/get-ieds"
import { calculateLayout } from "../_func-layout-calculation/node-layout"

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
	console.log(iedInfos)
	rootNode = await calculateLayout(iedInfos)
	console.log(rootNode)
}
</script>


<div class="root">
	{#if rootNode}
		<Diagram
			{rootNode}
		/>
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
