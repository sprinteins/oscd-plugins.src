<script lang="ts">
	import cssDiagram from './diagram.scss?inline';
	import cssIED from './ied.css?inline';
	import cssMessage from './message.css?inline';
  	import type { IEDNode, RootNode } from "./nodes";
	import IED from "./ied.svelte"
	import Message from "./message.svelte"
	import {createEventDispatcher} from 'svelte';

	// 
	// Inputs
	// 
	export let rootNode: RootNode
	export let selectedIEDID: string | undefined = undefined


	// 
	// Setup
	// 
	const dispatch = createEventDispatcher();
	function dispatchIEDClick(node: IEDNode){
		dispatch('iedclick', node)
	}



</script>
<svelte:options tag="tscd-diagram" />
<svelte:element this="style">{@html cssDiagram}</svelte:element>
<svelte:element this="style">{@html cssIED}</svelte:element>
<svelte:element this="style">{@html cssMessage}</svelte:element>

{#if rootNode}
<diagram>
	<svg viewBox={`0 0 ${rootNode.width} ${rootNode.height}`} style={`--width:${rootNode.width}px; --height:${rootNode.height}`} xmlns="http://www.w3.org/2000/svg">
		{#if rootNode.children }
		{#each rootNode.children as node}
			<foreignObject x={node.x} y={node.y} width={node.width} height={node.height} on:click={() => dispatchIEDClick(node)} on:keydown>
				<IED node={node} isSelected={node.id === selectedIEDID} />
			</foreignObject>
		{/each}
		{/if}

		{#if rootNode.edges}
		{#each rootNode.edges as edge}
			<Message {edge} />
		{/each}
		{/if}
	</svg>
</diagram>
{/if}
