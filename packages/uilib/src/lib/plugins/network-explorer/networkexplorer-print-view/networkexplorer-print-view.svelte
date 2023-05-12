<script lang="ts">
    import TelemetryView from "../../communication-explorer/telemetry-view.svelte"

    export let scdData: Element
</script>

<section class="network-explorer-print-content">
    <h1>Network Explorer</h1>
    <TelemetryView bind:root={scdData} showSidebar={false} />
</section>

<style>
    @media not print {
        .network-explorer-print-content {
            display: none;
        }
    }
</style>
