<script lang="ts">
    import css from "./message-type-filter.css?inline";
    import { selectedIEDNode, setSelectedMessageTypes } from "../../";
    import { MessageType } from "@oscd-plugins/core";

    let selectedMessageTypeGOOSe: boolean           = $selectedIEDNode?.selectedMessageTypes?.includes(MessageType.GOOSe);
    let selectedMessageTypeMMS: boolean             = $selectedIEDNode?.selectedMessageTypes?.includes(MessageType.MMS);
    let selectedMessageTypeReports: boolean         = $selectedIEDNode?.selectedMessageTypes?.includes(MessageType.Reports);
    let selectedMessageTypeSampledValues: boolean   = $selectedIEDNode?.selectedMessageTypes?.includes(MessageType.SampledValues);

    function setTargetMessageType(e: Event) {
        const element = e?.target as HTMLInputElement
        const name = element?.name
        const value = element?.checked

        setSelectedMessageTypes(name, value, $selectedIEDNode?.selectedMessageTypes)
    }
</script>

<div class="message-type">
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            bind:checked={selectedMessageTypeMMS} 
            name={MessageType.MMS} />
        <span>MMS</span>
    </label>
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            bind:checked={selectedMessageTypeGOOSe} 
            name={MessageType.GOOSe} />
        <span>GOOSe</span>
    </label>
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            bind:checked={selectedMessageTypeReports} 
            name={MessageType.Reports} />
        <span>Reports</span>
    </label>
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            bind:checked={selectedMessageTypeSampledValues} 
            name={MessageType.SampledValues} />
        <span>Sampled Values</span>
    </label>
</div>

<svelte:element this="style">{@html css}</svelte:element>