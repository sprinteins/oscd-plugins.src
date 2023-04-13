<script lang="ts">
	import type { ElkNode } from "elkjs/lib/elk-api";
  import css from './ied.css?inline';

  export let node: ElkNode
  export let width: number
  export let height: number

</script>
<svelte:options tag="tscd-ied" />
<svelte:element this="style">{@html css}</svelte:element>

{#if node}
<div class="ied" style={`--width:${width}px; --height:${height}px;`}>
	{node.id}
</div>
{/if}
