<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import { PrintBays } from "./print-bays"
    import { PrintBus } from "./print-bus"

    export let iedInfos: IEDCommInfo[]
</script>

<PrintBus {iedInfos} />
<PrintBays {iedInfos} />
