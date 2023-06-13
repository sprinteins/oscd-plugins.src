<script lang="ts">
  import { Icons, openSCDIcons } from "../../../components/icons"
  import type { Item as AffectedNodeItem } from "./item"
  import List, {
  	Item,
  	Graphic,
  	Meta,
  	Text,
  	PrimaryText,
  	SecondaryText,
  } from "@smui/list"

  // Input
  export let items: AffectedNodeItem[]

  // Internal
  type IconKeys = keyof typeof openSCDIcons;
  const iconMap: { [key: string]: IconKeys } = {
  	DAType:    "dAIcon",
  	DOType:    "dOIcon",
  	DO:        "dOIcon",
  	LNodeType: "lNIcon",
  }
</script>

<affected-nodes>
  <List twoLine avatarList nonInteractive class="list-dedupe-affected-nodes">
    {#each items as item, i}
      <Item class="item-dedupe-affected-nodes">
        <Graphic>
          <Icons name={iconMap[item.elementType]} size={"normal"} />
        </Graphic>
        <Text class="affected-nodes-names">
          <PrimaryText>{item.elementId}</PrimaryText>
          <SecondaryText class="secondary-text-affected-nodes"
            >{item.usedElementId}</SecondaryText
          >
        </Text>
      </Item>
    {/each}
  </List>
</affected-nodes>

<style>
  affected-nodes {
    overflow: auto;
    margin-left: -1rem;
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
