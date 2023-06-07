<script lang="ts">
    import type { IEDConnectionWithCustomValues } from "../../../../components/diagram"

    export let ConnectionSelection: IEDConnectionWithCustomValues
</script>

<table>
    <tr>
        <td>ID:</td>
        <td>{ConnectionSelection.id}</td>
    </tr>
    <tr>
        <td>Sources:</td>
        <td>{ConnectionSelection.sourceIED?.iedName}</td>
    </tr>
    <tr>
        <td>Targets:</td>
        <td>{ConnectionSelection.targetIED?.iedName}</td>
    </tr>
    <tr>
        <td>MessageType:</td>
        <td>{ConnectionSelection.messageType}</td>
    </tr>
</table>
