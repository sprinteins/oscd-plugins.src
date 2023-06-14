<script lang="ts">
  import type { IconKeys, openSCDIcons } from "../../../components/icons"
  import { type Item, List } from "../../../components/list"
  import type { Item as AffectedNodeItem } from "./item"

  // Input

  // export let items: AffectedNodeItem[];
  export let items: Item[]
  // Internal
</script>

<affected-nodes>
  <List {items} />
</affected-nodes>

<style>
  affected-nodes {
    overflow: auto;

    margin-top: -1rem;
  }
  :global(affected-nodes .affected-nodes-names) {
    margin-left: -1.5rem;
  }
  :global(affected-nodes .list-dedupe-affected-nodes) {
    margin-top: -1.5rem;
  }
  :global(affected-nodes .secondary-text-affected-nodes) {
    margin-top: -2.25rem;
  }
  :global(affected-nodes .item-dedupe-affected-nodes) {
    margin-bottom: -2.25rem;
    padding-left: 0.75rem;
  }
</style>
