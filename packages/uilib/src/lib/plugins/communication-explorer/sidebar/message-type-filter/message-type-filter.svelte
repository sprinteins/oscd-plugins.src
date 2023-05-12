

<script lang="ts">
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

<style>
    .message-type {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
        gap: .3rem
    }

    .message-type label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .message-type label input[disabled]+span {
        color: var(--color-text-disabled-1)
    }

    input[type="checkbox"] {
        accent-color: #004552;
        margin: 0;
    }
</style>

