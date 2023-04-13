<script lang="ts">
	import GooseMessage from "./goose-connections.svelte"
    import { ConnectionType } from "../sidebar";
</script>

<h1>Default GOOSE Connection</h1>

<GooseMessage header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Incoming} />
