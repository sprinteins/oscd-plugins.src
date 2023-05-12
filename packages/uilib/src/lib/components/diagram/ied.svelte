

<script lang="ts">
	import type { IEDNode } from "./nodes"
	
	export let node: IEDNode
	export let isSelected = false
</script>

{#if node}
	<div 
		class="ied" 
		class:isIrrelevant={!node.isRelevant} 
		class:focus={isSelected} 
	>
		{node.label}
	</div>
{/if}


<style>
	.ied{
		display: block;
		border:  var(--color-blue-dark) thin solid;
		height: 100%;
		width: 100%;
		cursor: pointer;
		padding: 0.2rem;
		transition: background-color 200ms ease-in-out;
		box-sizing: border-box;
	}
	
	.ied:hover{
		background-color: var(--color-blue-light);
		color: 			  var(--color-blue);
	}
	
	.ied-selected{
		background-color: var(--color-blue-light);
		color: 			  var(--color-blue);
	}
	
	.focus {
		background-color: var(--color-ied-focus);
	}
	.focus:hover {
		background-color: var(--color-ied-focus-hover);
	} 
	
	.isIrrelevant {
		opacity: 0.2;
	}
</style>