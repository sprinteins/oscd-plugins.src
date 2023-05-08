<svelte:options tag="tscd-button-group" />

<script lang="ts">
    import css from "./style.css?inline"
    import type { ButtonGroupOption } from "./types"

    export let selectedID = ""
    export let options: ButtonGroupOption[] = []
    export let disabled = false
</script>

<div class="btn-group" class:disabled data-testid="button-group">
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

<svelte:element this="style">{@html css}</svelte:element>
