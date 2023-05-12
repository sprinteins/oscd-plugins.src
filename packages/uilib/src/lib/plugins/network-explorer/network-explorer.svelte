<svelte:options tag="tscd-network-explorer" />

<script lang="ts">
	
	import { onMount } from "svelte"
	import NetworkExplorerPrintView from "./networkexplorer-print-view/networkexplorer-print-view.svelte"
	import NetworkExplorerWebView from "./networkexplorer-web-view/networkexplorer-web-view.svelte"
	import { disableOpenSCDComponentsForPrintView } from "."

	onMount(() => {
		disableOpenSCDComponentsForPrintView()
	})
</script>

<network-explorer>
	<NetworkExplorerPrintView />
	<NetworkExplorerWebView />
</network-explorer>


<style>
	
</style>