<svelte:options tag="tscd-network-explorer-web-view" />

<script lang="ts">
    import Button from "../../../components/button/button.svelte"
    import css from "./style.css?inline"

    function printDocumentation() {
    	print()
    }
</script>

<section class="network-explorer-web-content">
    <h1>Web View</h1>
    <Button label={"Mach Download!"} on:click={printDocumentation} />
</section>

<svelte:element this="style">{@html css}</svelte:element>
