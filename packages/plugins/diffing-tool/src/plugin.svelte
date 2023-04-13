<script lang="ts">
  import "@oscd-plugins/uilib"
</script>
<svelte:options tag={null} />

<main>
  <h1 class="tscd-h1">Diffing Tool</h1>
  <tscd-diffing-tool></tscd-diffing-tool>
</main>

<style>
.tscd-h1{
    color: green
}
.plugin-content {
    width: 50%;
    height: 50%;
    margin: 0 auto;
    display: block;
}
</style>

