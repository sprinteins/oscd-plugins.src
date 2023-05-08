<svelte:options tag="tscd-connection-type-filter" />

<script lang="ts">
    import {
    	ButtonGroup,
    	type ButtonGroupOption,
    } from "../../../../components/button-group/"
    import { changeMessageConnectionFilterDirection } from "../../selected-filter-store-functions"
    import css from "./connection-type-filter.css?inline"

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

<svelte:element this="style">{@html css}</svelte:element>
