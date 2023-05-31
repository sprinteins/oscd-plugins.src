<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import PrintTelemetry from "./print-telemetry/print-telemetry.svelte"
    import Pagebreak from "./pagebreak/pagebreak.svelte"
    import { calcIEDs } from "."
    import PrintDocumentation from "./print-documentation/print-documentation.svelte"

    export let scdData: Element
    let iedInfos: IEDCommInfo[] = calcIEDs(scdData)
</script>

<section class="network-explorer-print-content">
    <h1>Network Explorer</h1>
    <PrintTelemetry bind:scdData />

    <Pagebreak />

    <PrintDocumentation {iedInfos} />
</section>

<style lang="scss">
    @media not print {
        .network-explorer-print-content {
            display: none;
        }
    }
</style>
