<script lang="ts">
	import { Icons } from "../../../components/icons"
	import type { openSCDIcons } from "../../../icons"
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
	<List twoLine avatarList nonInteractive>
		{#each items as item, i}
			<Item>
				<Graphic>
					<Icons name={iconMap[item.elementType]} size={"normal"} />
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
	affected-nodes {
		overflow: auto;
	}
</style>
