<script lang="ts">
    import { MessageType } from "@oscd-plugins/core"
    import { isSelected, setTargetMessageType } from "."

    export let filterDisabled: boolean
    export let selectedMessageTypes: string[]

    let checkboxIsClicked = true
</script>

<div class="message-type">
    <label>
        <input
            type="checkbox"
            on:change={setTargetMessageType}
            checked={isSelected(
                MessageType.MMS,
                selectedMessageTypes,
                checkboxIsClicked
            )}
            disabled={filterDisabled}
            name={MessageType.MMS}
            data-testid="exampleFilterToBeChecked"
            class="mms-checkbox"
        />
        <div class="message-label">
            <span class="message-color-block message-color-mms" />
            <span class="text">MMS</span>
        </div>
    </label>
    <label>
        <input
            type="checkbox"
            on:change={setTargetMessageType}
            checked={isSelected(
                MessageType.GOOSE,
                selectedMessageTypes,
                checkboxIsClicked
            )}
            disabled={filterDisabled}
            name={MessageType.GOOSE}
            class="goose-checkbox"
        />
        <div class="message-label">
            <span class="message-color-block message-color-goose" />
            <span class="text">GOOSE</span>
        </div>
    </label>
    <label>
        <input
            type="checkbox"
            on:change={setTargetMessageType}
            checked={isSelected(
                MessageType.SampledValues,
                selectedMessageTypes,
                checkboxIsClicked
            )}
            disabled={filterDisabled}
            name={MessageType.SampledValues}
            class="sampledvalues-checkbox"
        />
        <div class="message-label">
            <span class="message-color-block message-color-sampledvalues" />
            <span class="text">Sampled Values</span>
        </div>
    </label>
</div>

<style lang="scss">
    .message-type {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
        gap: 0.3rem;
        color: var(--font-color);
    }

    .message-type label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    input[type="checkbox"] {
        accent-color: var(--color-accent);
        margin: 0;
    }

    .message-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: -0.1rem;
    }

    .message-color-block {
        height: 0.8rem;
        width: 0.8rem;
    }

    .message-label-checkbox-checked {
        height: 0.8rem;
        width: 0.8rem;
        gap: 1.3rem;
        white-space: nowrap;
    }

    .message-color-mms {
        background-color: var(--color-message-disabled-mms);
    }

    // rule applies, when checkbox is checked AND not disabled
    // affects the div.message-label class
    .mms-checkbox:checked:not([disabled]) + div.message-label {
        @extend .message-label-checkbox-checked;
        background-color: var(--color-message-mms);
    }

    .message-color-goose {
        background-color: var(--color-message-disabled-goose);
    }

    // rule applies, when checkbox is checked AND not disabled
    // affects the div.message-label class
    .goose-checkbox:checked:not([disabled]) + div.message-label {
        @extend .message-label-checkbox-checked;
        background-color: var(--color-message-goose);
    }

    .message-color-sampledvalues {
        background-color: var(--color-message-disabled-samplevalues);
    }

    // rule applies, when checkbox is checked AND not disabled
    // affects the div.message-label class
    .sampledvalues-checkbox:checked:not([disabled]) + div.message-label {
        @extend .message-label-checkbox-checked;
        background-color: var(--color-message-sampledvalues);
    }

    .message-type label input[disabled] + div.message-label {
        .text {
            color: var(--color-text-disabled-1);
        }
    }
</style>
