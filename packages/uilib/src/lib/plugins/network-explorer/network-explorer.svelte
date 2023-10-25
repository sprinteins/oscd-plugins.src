<script lang="ts">
	import Theme from "../../theme/theme.svelte"
	import { TelemetryView } from "./telemetry-view"

	export let root: Element
</script>

<Theme>
	<network-explorer>
		{#key root}
			<TelemetryView {root} />
		{/key}
	</network-explorer>
</Theme>

<style>
	network-explorer {
		display: block;
		position: relative;
		font-size: 12px;
		min-height: 80vh;
	}
</style>
