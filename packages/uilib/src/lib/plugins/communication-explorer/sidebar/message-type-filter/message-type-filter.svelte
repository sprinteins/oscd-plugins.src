<svelte:options tag="tscd-message-type-filter" />

<script lang="ts">
    import css from "./message-type-filter.css?inline"
    import { setSelectedMessageTypes } from "../../"
    import { MessageType } from "@oscd-plugins/core"

    export let filterDisabled: boolean
    export let selectedMessageTypes: string[]

    function isSelected(
    	messageType: MessageType,
    	selectedMessages: string[] = []
    ) {
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
            disabled={filterDisabled}
            name={MessageType.MMS}
            data-testid="exampleFilterToBeChecked"
        />
        <span>MMS</span>
    </label>
    <label>
        <input
            type="checkbox"
            on:change={setTargetMessageType}
            checked={isSelected(MessageType.GOOSe, selectedMessageTypes)}
            disabled={filterDisabled}
            name={MessageType.GOOSe}
        />
        <span>GOOSe</span>
    </label>
    <label>
        <input
            type="checkbox"
            on:change={setTargetMessageType}
            checked={isSelected(
                MessageType.SampledValues,
                selectedMessageTypes
            )}
            disabled={filterDisabled}
            name={MessageType.SampledValues}
        />
        <span>Sampled Values</span>
    </label>
</div>

<svelte:element this="style">{@html css}</svelte:element>
