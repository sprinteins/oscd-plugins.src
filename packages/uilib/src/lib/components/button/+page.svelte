<script lang="ts">
    import { Example } from "../internal"
    import { Button } from "."

    function handleClick() {
    	console.log("clicked")
    }
</script>

<h1>Add Button</h1>

<Example name="Primary">
    <Button on:click={handleClick} label="Create" />
    <Button on:click={handleClick} label="Create" disabled />
</Example>

<Example name="Secondary">
    <Button type="secondary" on:click={handleClick} label="Create" />
    <Button type="secondary" on:click={handleClick} label="Create" disabled />
</Example>

<Example name="Tertiary">
    <Button type="tertiary" on:click={handleClick} label="Create" />
    <Button type="tertiary" on:click={handleClick} label="Create" disabled />
</Example>

<Example name="Block">
    <Button block={true} label="Create Item" />
    <Button block={true} label="Create Item" disabled />
</Example>

<Example name="Dangerous">
    <Button dangerous label="Delete Somthing" />
    <Button dangerous label="Delete Somthing" disabled />
</Example>
