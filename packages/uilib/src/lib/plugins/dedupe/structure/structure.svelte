<script lang="ts">
  import type { Item as StructureItem } from "./item"
  import List, { Item, Text, PrimaryText, SecondaryText } from "@smui/list"

  // Input
  export let items: StructureItem[]
</script>

<structure>
  <List twoLine avatarList nonInteractive class="list-dedupe-structure">
    {#each items as item, i}
      <Item class="item-dedupe-structure">
        <Text>
          <PrimaryText>{item.label}</PrimaryText>
          <SecondaryText class="secondary-text-structure"
            >{item.type}</SecondaryText
          >
        </Text>
      </Item>
    {/each}
  </List>
</structure>

<style lang="scss">
  structure {
    overflow: auto;
  }
  :global(structure .secondary-text-structure) {
    margin-top: -2.25rem;
  }
  :global(structure .list-dedupe-structure) {
    margin-top: -1.5rem;
  }
  :global(structure .item-dedupe-structure) {
    margin-bottom: -2.25rem;
    padding-left: 0.75rem;
  }
</style>
