<script lang="ts">
  	import type { ElkNode } from "elkjs/lib/elk-api";
	export let node: ElkNode
	export let width: number
	export let height: number

</script>

<div class="ied" style={`--width:${width}px; --height:${height}px;`}>
	{node.id}
</div>

<style>
	.ied{
		display: block;
		border:  var(--color-blue-dark) thin solid;
		/* width:   var(--width, 100%); */
		width:   100%;
		/* height:  var(--height, 100%); */
		height:  100%;
		
		cursor: pointer;
		padding: 0.2rem;
	}

	.ied:hover{
		background-color: var(--color-blue-light);
		color: 			  var(--color-blue);
	}
</style>