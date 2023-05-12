<svelte:options tag="tscd-network-explorer-print-view" />

<script lang="ts">
    import Diagram from "./diagram/diagram-for-print.svelte"
    import css from "./style.css?inline"

    export let scdData: Element
</script>

<section class="network-explorer-print-content">
    <h1>Network Explorer</h1>
    <Diagram bind:root={scdData} />
</section>

<svelte:element this="style">{@html css}</svelte:element>
