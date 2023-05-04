<svelte:options tag="tscd-connection-type-filter" />

<script lang="ts">
    import { changeMessageConnectionFilterDirection } from "../../selected-filter-store-functions"
    import css from "./connection-type-filter.css?inline"

    export let isIedFiltersDisabled = false
    export let showIncomingConnections: boolean
    export let showOutgoingConnections: boolean

    function setConnectionDirection(e: Event) {
    	const element = e.target as HTMLInputElement
    	const name: string = element.name
    	const isChecked: boolean = element.checked

    	switch (name) {
    	case "incoming":
    		changeMessageConnectionFilterDirection(
    			isChecked,
    			showOutgoingConnections
    		)
    		break

    	case "outgoing":
    		changeMessageConnectionFilterDirection(
    			showIncomingConnections,
    			isChecked
    		)
    		break

    	default:
    		break
    	}
    }
</script>

<div class="connection-type">
    <label>
        <input
            type="checkbox"
            checked={showIncomingConnections}
            on:change={setConnectionDirection}
            disabled={isIedFiltersDisabled}
            data-testid="exampleFilterToBeChecked"
            name="incoming"
        />
        <span>Incoming Connection</span>
    </label>
    <label>
        <input
            type="checkbox"
            checked={showOutgoingConnections}
            on:change={setConnectionDirection}
            disabled={isIedFiltersDisabled}
            name="outgoing"
        />
        <span>Outgoing Connection</span>
    </label>
    {#if !showIncomingConnections && !showOutgoingConnections}
        <span>*You have to select at least one</span>
    {/if}
</div>

<svelte:element this="style">{@html css}</svelte:element>
