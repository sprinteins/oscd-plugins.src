<svelte:options tag={null} />

<script lang="ts">
  import { Dedupe } from "@oscd-plugins/uilib/src/lib/plugins/dedupe";
  import * as pckg from "../package.json";

  // Inputs
  export let doc: XMLDocument;
</script>

{#if doc}
{#key doc}
  <Dedupe doc={doc?.documentElement} />
{/key}
{/if}

<input type="hidden" name="package-name" value={pckg.name} />
<input type="hidden" name="package-version" value={pckg.version} />
