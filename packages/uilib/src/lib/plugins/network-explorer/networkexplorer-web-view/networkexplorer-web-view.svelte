<script lang="ts">
    import Button from "../../../components/button/button.svelte"

    function printDocumentation() {
    	print()
    }
</script>

<section class="network-explorer-web-content">
    <h1>Web View</h1>
    <Button on:click={printDocumentation}>Mach Download!</Button>
</section>

<style>
    @media print {
        .network-explorer-web-content {
            display: none;
        }
    }
</style>
