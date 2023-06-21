<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import PrintTelemetry from "./print-telemetry/print-telemetry.svelte"
    import { calcIEDs } from "."
    import PrintDocumentation from "./print-documentation/print-documentation.svelte"
    import { PdfType, pdfExportStore } from "../_store-pdf-export"

    export let scdData: Element
    let iedInfos: IEDCommInfo[] = calcIEDs(scdData)
</script>

<section class="documentation-print-content">
    {#if $pdfExportStore.type === PdfType.Telegram}
        <PrintTelemetry bind:scdData />
    {:else if $pdfExportStore.type === PdfType.Documentation}
        <PrintDocumentation {iedInfos} />
    {/if}
</section>

<style lang="scss">
    @media not print {
        .documentation-print-content {
            display: none;
        }
    }
</style>
