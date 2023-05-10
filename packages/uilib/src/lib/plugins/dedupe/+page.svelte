<script lang="ts">
	import { Dedupe } from "."
	import { Example } from "../../components/internal"
	import { xmlStr } from "../../../test-files/simple_v5"
	
	const parser = new DOMParser()
	const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
	
</script>

<Example name="Dedupe Plugin">
	<container>
		<Dedupe doc={doc} />
	</container>
</Example>


<style>
	container{
		height: 70vh;
		display: block;
	}
</style>
