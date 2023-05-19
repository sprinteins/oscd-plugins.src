<script lang="ts">
	import type { Item as StructureItem } from "./item"
	import List, {
		Item,
		Text,
		PrimaryText,
		SecondaryText,
	} from "@smui/list"

	// Input
	export let items: StructureItem[]


</script>

<structure>
	<List
		twoLine
		avatarList
		nonInteractive
	>
		{#each items as item, i}
			<Item>
				<Text>
					<PrimaryText>{item.label}</PrimaryText>
					<SecondaryText>{item.type}</SecondaryText>
				</Text>
			</Item>
		{/each}
	</List>

</structure>

<style>
	structure{
		overflow: auto
	}
</style>