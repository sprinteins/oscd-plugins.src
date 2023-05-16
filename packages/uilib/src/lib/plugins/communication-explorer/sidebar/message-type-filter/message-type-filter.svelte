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
        <span class="message-label">
            <span class="message-color message-color-mms" />
            MMS
        </span>
    </label>
    <label>
        <input
            type="checkbox"
            on:change={setTargetMessageType}
            checked={isSelected(MessageType.GOOSE, selectedMessageTypes)}
            disabled={filterDisabled}
            name={MessageType.GOOSE}
        />
        <span class="message-label">
            <span class="message-color message-color-goose" />
            GOOSE
        </span>
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
        <span class="message-label">
            <span class="message-color message-color-sampledvalues" />
            Sampled Values
        </span>
    </label>
</div>

<style lang="scss">
    .message-type {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
        gap: 0.3rem;
    }

    .message-type label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .message-type label input[disabled] + span {
        color: var(--color-text-disabled-1);
    }

    input[type="checkbox"] {
        accent-color: #004552;
        margin: 0;
    }

    .message-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .message-color {
        background-color: black;
        height: 0.8rem;
        width: 0.8rem;
        display: block;

        &.message-color-mms {
            background-color: var(--color-message-mms);
        }
        &.message-color-goose {
            background-color: var(--color-message-goose);
        }
        &.message-color-sampledvalues {
            background-color: var(--color-message-sampledvalues);
        }
    }
</style>
