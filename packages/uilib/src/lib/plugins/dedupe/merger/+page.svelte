<script lang="ts">
	import { Merger } from "."
	import { Example } from "../../../components/internal"
import type { MergableItem } from "./mergable-items"

	const items: MergableItem[] = [
		{label: "phaseA", usages: ["LN0", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseB", usages: ["LN0", "LN2", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseC", usages: ["LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseD", usages: ["LN3", "LN1", "LN1", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseE", usages: ["LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseF", usages: ["LN1", "LN1", "LN1", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseF", usages: ["LN1", "LN1", "LN1", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseF", usages: ["LN1", "LN1", "LN1", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseF", usages: ["LN1", "LN1", "LN1", "LN1", "LN1", "LN1", "LN1"]},
		{label: "phaseF", usages: ["LN1", "LN1", "LN1", "LN1", "LN1", "LN1", "LN1"]},
	]

	const structure = [
		"Beh",
		"Mod",
		"Health",
		"q",
		"Beh",
		"Mod",
		"Health",
		"q",
		"Beh",
		"Mod",
		"Health",
		"q",
		"Beh",
		"Mod",
		"Health",
		"q",
		"Beh",
		"Mod",
		"Health",
		"q",
		"Beh",
		"Mod",
		"Health",
		"q",
	]

  </script>
  
<Example name="Merger">
	<div class="container">
		<Merger 
			{items} 
			{structure} 
			on:merge={console.log} 
		/>
	</div>
</Example>

<style>
	.container{
		width: 50%;
		height: 80vh
	}
</style>