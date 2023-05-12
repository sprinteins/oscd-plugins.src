<script lang="ts">
    import Diagram from "./diagram/diagram-for-print.svelte"

    export let scdData: Element
</script>

<section class="network-explorer-print-content">
    <h1>Network Explorer</h1>
    <Diagram bind:root={scdData} />
</section>

<style>
    @media not print {
        .network-explorer-print-content {
            display: none;
        }
    }
</style>
