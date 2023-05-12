<svelte:options tag="tscd-network-explorer" />

<script lang="ts">
	import css from "./network-explorer.css?inline"
	import { onMount } from "svelte"
	import NetworkExplorerPrintView from "./networkexplorer-print-view/networkexplorer-print-view.svelte"
	import NetworkExplorerWebView from "./networkexplorer-web-view/networkexplorer-web-view.svelte"
	import { disableOpenSCDComponentsForPrintView } from "."

	export let root: Element

	onMount(() => {
		disableOpenSCDComponentsForPrintView()
	})
</script>

<network-explorer>
	<NetworkExplorerPrintView bind:scdData={root} />
	<NetworkExplorerWebView />
</network-explorer>

<svelte:element this="style">{@html css}</svelte:element>
