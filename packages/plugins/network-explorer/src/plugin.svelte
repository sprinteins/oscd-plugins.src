<script lang="ts">
  import { NetworkExplorer } from  "@oscd-plugins/uilib/src/lib/plugins/network-explorer"
  import * as pckg from "../package.json"
</script>
<svelte:options tag={null} />

<main>
  <NetworkExplorer />

  <input type="hidden" name="package-name" value={pckg.name} />
  <input type="hidden" name="package-version" value={pckg.version} />
</main>

<style>

</style>