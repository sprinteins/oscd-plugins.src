<script lang="ts">
    import Chip, { Set, Text } from "@smui/chips"
    import type { ChipContents } from "."
    import { createEventDispatcher } from "svelte"

    const dispatchEvent = createEventDispatcher()
    let selectedChip: ChipContents = []

    export let chips: ChipContents
    export let selectedChipIdentifier: string[] = []
    $: selectedChip = chips.filter((chip) =>
    	selectedChipIdentifier.includes(chip.identifier) ? chip : undefined
    )

    $: console.log(selectedChip)

    // $: onUpdate(selectedChip);
    // function onUpdate(selectedChips: ChipContents) {
    //     const selectedValues = selectedChips.map((chip) => {
    //         return chip.identifier;
    //     });

    //     // selectedChipIdentifier = selectedValues;

    //     dispatchEvent("selectedUpdate", {
    //         selected: selectedValues,
    //     });
    // }
</script>

<Set {chips} let:chip filter bind:selected={selectedChip}>
    <Chip {chip}>
        <Text>{chip.label} {chip.counter ?? ""}</Text>
    </Chip>
</Set>

<style lang="scss">
    // todo: adapt style, this is just a copy dump from deprecated code
    :global(.mdc-chip) {
        height: 0;
        padding: 0.75rem 1rem;
        background-color: var(--mdc-theme-surface);
    }

    :global(.mdc-chip--selected) {
        outline: 1px var(--mdc-theme-primary) solid;
        color: var(--mdc-theme-primary);
    }

    :global(.mdc-chip-set) {
        display: inline-block;
        padding: 0;
        margin: 0;
    }
</style>
