<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import { convertIEDNameToID } from "../_shared-functions"

    export let iedInfos: IEDCommInfo[]
</script>

<h2>List of all IEDs</h2>

<ul>
    {#each iedInfos as ied}
        {@const link = convertIEDNameToID(ied.iedName, true)}
        <li>
            <a href={link}>{ied.iedName}</a>
        </li>
    {/each}
</ul>
