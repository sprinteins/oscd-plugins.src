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
	$: selection = selectedIndex >= 0 ? itemSets[selectedIndex] : []

</script>

<Example name="Group Card List">
	<div class="container">
		<GroupCardList 
			{itemSets} 
			on:select={(e) => handleSelect(e.detail.index)}
		/>
	</div>
	<hr />
	<div>
		Selection: <pre>{selection}</pre>
	</div>
</Example>

<style>
	.container{
		width: 200px;
	}
</style>