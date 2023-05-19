<script lang="ts">

</script>

<layout>
	<div class="columns">
		<div class="collective">
			<slot name="category-selector"></slot>
			<slot name="group-card-list"></slot>
		</div>
		<div class="panel">
			<h5 class="mdc-typography--headline5">Duplicate Types</h5>
			<slot name="type-linker"></slot>
		</div>
		<div class="panel">
			<h5 class="mdc-typography--headline5">Affected Nodes</h5>
			<slot name="affected-nodes"></slot>
		</div>
		<div class="panel">
			<h5 class="mdc-typography--headline5">Structure</h5>
			<slot name="structure"></slot>
		</div>
	</div>

</layout>

<style>
	.collective{
		display: grid;
		grid-template-rows: auto 1fr;
	}

	h5.mdc-typography--headline5{
		margin: 16px 0;
	}

	.columns{
		--magic-number: 510px;
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: var(--magic-number) 1fr 1fr 1fr;
		gap:1rem;
	}
	.columns > div {
		padding: 0.5rem;
		height: 100%;
		overflow: hidden;
	}

	.panel{
		height:100%;
		background: var(--mdc-theme-surface);
		display: grid;
		grid-template-rows: auto 1fr;
		overflow: hidden;
	}


</style>