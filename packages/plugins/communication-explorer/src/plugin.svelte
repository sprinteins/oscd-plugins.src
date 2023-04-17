<script lang="ts">
  import { CommunicationExplorer } from "@oscd-plugins/uilib/src/lib/plugins/communication-explorer"
  import * as pckg from "../package.json"

  export let doc: XMLDocument

  $: console.log({msg:"comm_exp new doc", doc})
</script>
<svelte:options tag={null} />

{#if doc}
  <CommunicationExplorer root={doc?.documentElement} />
{/if}


<input type="hidden" name="package-name" value={pckg.name} />
<input type="hidden" name="package-version" value={pckg.version} />
