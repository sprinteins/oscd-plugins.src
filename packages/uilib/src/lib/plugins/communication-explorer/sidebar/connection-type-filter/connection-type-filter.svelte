<script lang="ts">
    export let isIedFiltersDisabled: boolean = false;
    export let showIncomingConnections: boolean;
    export let showOutgoingConnections: boolean;
</script>

<div class="connection-type">
    <label>
        <input
            type="checkbox"
            bind:checked={showIncomingConnections}
            on:change
            disabled={isIedFiltersDisabled}
            data-testid="exampleFilterToBeChecked"
        />
        <span>Incoming Connection</span>
    </label>
    <label>
        <input
            type="checkbox"
            bind:checked={showOutgoingConnections}
            on:change
            disabled={isIedFiltersDisabled}
        />
        <span>Outgoing Connection</span>
    </label>
    {#if !showIncomingConnections && !showOutgoingConnections}
        <span>*You have to select at least one</span>
    {/if}
</div>
