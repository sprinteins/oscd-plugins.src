<script lang="ts">
	import { NetworkExplorer } from "."
	import { xmlStr } from "../../../test-files/simple_v7"
	import { Example } from "../../components/internal"

	const parser = new DOMParser()
	const doc = parser.parseFromString(
		xmlStr,
		"text/xml"
	) as unknown as Element
</script>

<Example name="Network Explorer">
	<NetworkExplorer root={doc} />
</Example>
