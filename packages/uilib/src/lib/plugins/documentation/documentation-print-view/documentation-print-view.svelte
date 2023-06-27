<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import PrintTelemetry from "./print-telemetry/print-telemetry.svelte"
    import { calcIEDs } from "."
    import PrintDocumentation from "./print-documentation/print-documentation.svelte"

    export let scdData: Element
    let iedInfos: IEDCommInfo[] = calcIEDs(scdData)
</script>

<section class="documentation-print-content" id="documentation-print-content">
    <div id="tscd-documentation-print-content-communication">
        <PrintTelemetry bind:scdData />
    </div>

    <div id="documentation-print-content-documentation">
        <PrintDocumentation {iedInfos} />
    </div>
</section>

<style lang="scss">
    @media not print {
        .documentation-print-content {
            display: none;
        }
    }
</style>
