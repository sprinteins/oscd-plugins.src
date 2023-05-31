<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import { PrintBays } from "./print-bays"

    export let iedInfos: IEDCommInfo[]
</script>

<PrintBays {iedInfos} />
