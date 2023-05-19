<script lang="ts">
  import { openSCDIcons } from "../../../icons"
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
	type IconKeys = keyof typeof openSCDIcons
const iconMap: {[key: string]: IconKeys} = {
	"DAType":    "dAIcon",
	"DOType":    "dOIcon",
	"DO": 	      "dOIcon",
	"LNodeType": "lNIcon",
}

</script>

<affected-nodes>
	<List
		twoLine
		avatarList
		nonInteractive
	>
		{#each items as item, i}
			<Item>
				<Graphic>
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 26.5 24" width="26.5">
						{@html openSCDIcons[iconMap[item.elementType]]}
					</svg>
				</Graphic>
			<Text>
				<PrimaryText>{item.elementId}</PrimaryText>
				<SecondaryText>{item.usedElementId}</SecondaryText>
			</Text>
			</Item>
		{/each}
	</List>


</affected-nodes>

<style>
	affected-nodes{
		overflow: auto
	}
</style>