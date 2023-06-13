<script lang="ts">
  export let checked = false
  export let label: string
  export let testid = ""
</script>

<checkbox data-testid={testid}>
  <label>
    <input type="checkbox" on:change on:input bind:checked />
    <span>{label}</span>
  </label>
</checkbox>

<style>
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
