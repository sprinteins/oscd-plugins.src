<script lang="ts">
    import ButtonGroup from "./button-group.svelte"
    import type { ButtonGroupOption } from "./types"
    import { Example } from "../internal"

    const options: ButtonGroupOption[] = [
    	{ id: "option1", label: "🍕 Pizza" },
    	{ id: "option2", label: "🍜 Noodles" },
    	{ id: "option3", label: "🍫 Chocolate" },
    ]
</script>

<Example name="Button Group">
    <ButtonGroup {options} selectedID={"option2"} />
</Example>
