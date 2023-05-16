<script lang="ts">
	import Theme from "../../theme/theme.svelte"
	import TelemetryView from "./telemetry-view.svelte"

	export let root: Element
</script>

<Theme>
	<communication-explorer>
		<TelemetryView bind:root />
	</communication-explorer>
</Theme>

<style>
	communication-explorer {
		display: block;
		position: relative;
		font-size: 12px;
		min-height: 80vh;
	}
</style>
