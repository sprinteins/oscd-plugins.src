<svelte:options tag="tscd-message-type-filter" />
<script lang="ts">
    import css from "./message-type-filter.css?inline"
    import { selectedIEDNode, setSelectedMessageTypes } from "../../"
    import { MessageType } from "@oscd-plugins/core"

    $: selectedMessageTypes = $selectedIEDNode.selectedMessageTypes
    function isSelected(messageType: MessageType, selectedMessages:string[] = []) {
        return selectedMessages.includes(messageType)
    }

    function setTargetMessageType(e: Event) {
    	const element = e?.target as HTMLInputElement
    	const name = element?.name as MessageType
    	const value = element?.checked

    	setSelectedMessageTypes(name, value)
    }
</script>

<div class="message-type">
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            checked={isSelected(MessageType.MMS, selectedMessageTypes)} 
            name={MessageType.MMS} />
        <span>MMS</span>
    </label>
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            checked={isSelected(MessageType.GOOSe, selectedMessageTypes)} 
            name={MessageType.GOOSe} />
        <span>GOOSe</span>
    </label>
    <label>
        <input 
            type="checkbox" 
            on:change={setTargetMessageType} 
            checked={isSelected(MessageType.SampledValues, selectedMessageTypes)} 
            name={MessageType.SampledValues} />
        <span>Sampled Values</span>
    </label>
</div>

<svelte:element this="style">{@html css}</svelte:element>