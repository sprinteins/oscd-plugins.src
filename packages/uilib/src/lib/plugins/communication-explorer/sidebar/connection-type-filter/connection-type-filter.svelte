

<script lang="ts">
    import {
    	ButtonGroup,
    	type ButtonGroupOption,
    } from "../../../../components/button-group/"
    import { changeMessageConnectionFilterDirection } from "../../selected-filter-store-functions"

    export let showIncomingConnections: boolean
    export let showOutgoingConnections: boolean
    export let connectionDirectionDisabled: boolean

    $: buttonGroupSelection = updateButtonGroup(
    	showIncomingConnections,
    	showOutgoingConnections
    )

    const options: ButtonGroupOption[] = [
    	{ id: "incoming", label: "Incoming" },
    	{ id: "outgoing", label: "Outgoing" },
    	{ id: "both", label: "Both" },
    ]

    function updateButtonGroup(incoming: boolean, outgoing: boolean) {
    	if (incoming && outgoing) return "both"
    	else if (incoming) return "incoming"
    	else if (outgoing) return "outgoing"
    }

    function onUpdate(e: Event) {
    	const element = e.target as HTMLInputElement
    	const value = element.value

    	if (value === "incoming") {
    		changeMessageConnectionFilterDirection(true, false)
    	} else if (value === "outgoing") {
    		changeMessageConnectionFilterDirection(false, true)
    	} else {
    		changeMessageConnectionFilterDirection(true, true)
    	}
    }
</script>

<ButtonGroup
    {options}
    selectedID={buttonGroupSelection}
    on:change={onUpdate}
    disabled={connectionDirectionDisabled}
/>


<style>
	.connection-type {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		user-select: none;
	}

	.connection-type label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	label input[disabled]+span {
		color: var(--color-text-disabled-1)
	}
</style>