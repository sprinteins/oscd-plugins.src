<script lang="ts">
	import { onMount } from "svelte"
	import NetworkExplorerPrintView from "./networkexplorer-print-view/networkexplorer-print-view.svelte"
	import NetworkExplorerWebView from "./networkexplorer-web-view/networkexplorer-web-view.svelte"
	import { disableOpenSCDComponentsForPrintView } from "."
	import { TestCommunicationInformation } from "@oscd-plugins/core"
	import { Theme } from "../../theme"

	export let root: Element

	onMount(() => {
		disableOpenSCDComponentsForPrintView()

		console.log("root", root)

		const testInst = new TestCommunicationInformation()
		const testdata = testInst.findIEDsWithLnDoDaEnums(root)
		console.log(testdata)
	})
</script>

<Theme>
	<network-explorer>
		<NetworkExplorerPrintView bind:scdData={root} />
		<NetworkExplorerWebView />
	</network-explorer>
</Theme>

<style>
</style>
