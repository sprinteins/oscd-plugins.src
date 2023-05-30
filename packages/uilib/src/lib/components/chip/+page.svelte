<script lang="ts">
    import { Chip, type ChipContents } from "."
    import Example from "../internal/example/example.svelte"

    const chips: ChipContents = [
    	{ identifier: "pizza", label: "Pizza", counter: 5 },
    	{ identifier: "pasta", label: "Pasta", counter: 5 },
    	{ identifier: "burger", label: "Burger" },
    ]

    // import Chip, { Set, Text } from "@smui/chips";

    // let choices = ["Shoes", "Pants", "Shirts", "Hats", "Coats"];
    // let selected = ["Shoes", "Shirts", "Coats"];
</script>

<Example>
    <Chip {chips} />
</Example>

<!-- <Example>
    <Set chips={choices} let:chip filter bind:selected>
        <Chip {chip} touch>
            <Text>{chip}</Text>
        </Chip>
    </Set>

    <pre class="status">Selected: {selected.join(", ")}</pre>
</Example> -->
