<script lang="ts">
	import type { ElkNode } from "elkjs/lib/elk-api";
  import css from './ied.css?inline';
  import {selectedIEDNode} from "../../stores/selectedFilter"
  import { onDestroy } from "svelte";

  export let node: ElkNode
  export let width: number
  export let height: number
  let isSelected: boolean = false
  let isRelevant: boolean = false

</script>

<svelte:options tag="tscd-ied" />
<svelte:element this="style">{@html css}</svelte:element>

{#if node}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="ied" class:isNotRelevant={isRelevant} class:focus={isSelected} style={`--width:${width}px; --height:${height}px;`}>
	{node.id}
</div>
{/if}
