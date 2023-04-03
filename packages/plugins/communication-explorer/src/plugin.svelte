<script lang="ts">
  import "@oscd-plugins/uilib"

  export let doc: XMLDocument

  $: console.log({msg:"comm_exp doc", doc})
</script>

<main>
  <h1>Communication Explorer</h1>
  {#if doc}
    <tscd-communication-explorer root={doc}></tscd-communication-explorer>
  {/if}
</main>

<style>

</style>