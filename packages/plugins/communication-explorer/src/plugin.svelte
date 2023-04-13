<script lang="ts">
  import "@oscd-plugins/uilib"

  export let doc: XMLDocument

  $: console.log({msg:"comm_exp doc", doc})
</script>

{#if doc}
  <tscd-communication-explorer root={doc}></tscd-communication-explorer>
{/if}
