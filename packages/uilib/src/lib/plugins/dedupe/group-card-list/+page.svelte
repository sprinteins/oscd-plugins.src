<script lang="ts">
	import Example from "../../../components/internal/example/example.svelte"
	import { GroupCardList } from "."

	const itemSets: string[][] = [
		["phaseA", "phaseB", "phaseC","phaseD","phaseE","phaseF"],
		["phaseA", "phaseB", "phaseC","phaseD"],
		["phaseA", "phaseB", "phaseC","phaseD","phaseF"],
	]

	let selectedIndex = -1
	function handleSelect(index:number){
		selectedIndex = index
	}

</script>

<Example name="Group Card List">
	<GroupCardList 
		{itemSets} 
		{selectedIndex}
		on:select={(e) => handleSelect(e.detail.index)}
	/>
</Example>