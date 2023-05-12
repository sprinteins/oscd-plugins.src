<script lang="ts">
  import { NetworkExplorer } from  "@oscd-plugins/uilib/src/lib/plugins/network-explorer"
  import * as pckg from "../package.json"

  export let doc: XMLDocument;
</script>



<main>
  <NetworkExplorer />

  <input type="hidden" name="package-name" value={pckg.name} />
  <input type="hidden" name="package-version" value={pckg.version} />
</main>

<style>

</style>