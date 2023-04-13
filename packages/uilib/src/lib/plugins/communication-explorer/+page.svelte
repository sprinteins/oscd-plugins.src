<script lang="ts">
    import { Example } from "$lib/components/internal"
	import { CommunicationExplorer } from "./index"
	import { xmlStr } from "../../../test-files/simple_v5"

		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element

</script>

<Example name="Communication Explorer">
    <CommunicationExplorer root={doc} />
	<!-- <tscd-communication-explorer root={doc} ></tscd-communication-explorer> -->
</Example>