

<script lang="ts">
	import { Counter } from "../../../components/counter"

	// Input
	export let items: string[] = []
	export let dataTestid = ""
	export let selected = false

	// Config
	const MAX_NR_OF_ITEMS = 3
	$: displayedItems = items.slice(0, MAX_NR_OF_ITEMS)
	$: titleText = items.join("\n")


</script>

<group-card 
	on:click 
	on:keypress 
	data-testid={dataTestid} 
	class:selected 
	title={titleText}
>
	<div class="left">
	<ul>
		{#each displayedItems as item}
			<li>{item}</li>
		{/each}
	</ul>
	</div>
	<div class="right">
		<Counter count={items.length} />
	</div>
</group-card>

<style lang="scss">
	group-card {

		display: inline-grid;
		border:  var(--color-black) 1px solid;
		border-radius: var(--border-radius);
		cursor:  pointer;
		height:  80px;
		padding: 0rem;

		grid-template-columns: 1fr min(25px);

		&.selected{
			background: var(--color-blue-dark);
			color:		var(--color-yellow);
		}

		&:hover:not(.selected){
			background: var(--color-blue-light);
		}

		.left{
			--padding: 1rem;
			padding:  var(--padding) 0 var(--padding) var(--padding);
			overflow: hidden;
		}

		.right{
			padding: 0.3rem;
		}

		ul {
			padding: 0;
			margin:  0;
		}

		li{
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

	}
</style>