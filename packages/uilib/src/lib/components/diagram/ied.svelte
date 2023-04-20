<script lang="ts">
  import type { IEDNode } from "./nodes";

  export let node: IEDNode
  export let isSelected: boolean = false


</script>
<svelte:options tag="tscd-ied" />


{#if node}
<div class="ied" class:isIrrelevant={!node.isRelevant} class:focus={isSelected}>
  {node.label}
</div>
{/if}
