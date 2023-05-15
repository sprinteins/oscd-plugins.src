

<script lang="ts">
    import type { ButtonGroupOption } from "./types"

    export let selectedID = ""
    export let options: ButtonGroupOption[] = []
    export let disabled = false
</script>

<div 
    class="btn-group" 
    class:disabled 
    data-testid="button-group"
>
    {#each options as option}
        <label for={option.id}>
            <input
                type="radio"
                name="option"
                id={option.id}
                checked={option.id === selectedID}
                value={option.id}
                on:change
                {disabled}
            />
            <div class="btn">{option.label}</div>
        </label>
    {/each}
</div>

<style>
    /* TODO use color theme variables */

    .btn-group {
		--color-button-group-default:  #5F6E75;
		--color-button-group-selected: #004552;
        
        display:         flex;
        justify-content: center;
    }

    .btn-group div.btn {
        border: none;
        background-color: var(--color-button-group-default);
        color: var(--color-white);
        padding: 8px 12px;
        cursor: pointer;
        transition: background-color 200ms ease-in-out;
    }

    .btn-group div.btn:hover {
        background-color: var(--color-grey-2);
    }

    .btn-group label:last-of-type div.btn {
        border-top-right-radius:    var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    }

    .btn-group label:first-of-type div.btn {
        border-top-left-radius:    var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
    }

    .btn-group input:checked~div.btn {
        background-color: var(--color-button-group-selected);
    }

    .btn-group input {
        display: none;
    }

    .btn-group.disabled div.btn {
        background-color: var(--color-grey-3) !important;
        cursor: not-allowed;
    }
</style>
