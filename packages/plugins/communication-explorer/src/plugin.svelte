<script lang="ts">
  import "@oscd-plugins/uilib"
  import * as pckg from "../package.json"
  console.log({level:"info", msg:"init plugin", name: pckg.name, version:pckg.version})

  export let doc: XMLDocument

  $: console.log({msg:"comm_exp new doc", doc})
</script>

{#if doc}
  <tscd-communication-explorer root={doc}></tscd-communication-explorer>
{/if}

<input type="hidden" name="package-name" value={pckg.name} />
<input type="hidden" name="package-version" value={pckg.version} />