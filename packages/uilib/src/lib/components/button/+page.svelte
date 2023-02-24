<script lang="ts">
    import { Example } from "$lib/components/internal"
	import Button from "./button.svelte"

    function handleClick(){
        console.log("clicked")
    }

</script>

<h1>Add Button</h1>


<Example name="Inline">
    <Button on:click={handleClick}>New Stuff</Button>
</Example>

<Example name="Block">
    <Button block={true}>Create Item</Button>
</Example>


<Example name="Dangerous">
    <Button dangerous>Delete Something</Button>
</Example>


