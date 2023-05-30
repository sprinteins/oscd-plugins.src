<script lang="ts">
    import { xmlStr } from "../../../test-files/simple_v5"
    import { Example } from "../../components/internal"
    import { NetworkExplorer } from "./index"

    const parser = new DOMParser()
    const doc = parser.parseFromString(
    	xmlStr,
    	"text/xml"
    ) as unknown as Element
</script>

<Example name="Network Explorer">
    <NetworkExplorer root={doc} />
</Example>
