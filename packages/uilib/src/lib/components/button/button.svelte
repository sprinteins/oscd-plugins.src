<script lang="ts">
	export let block = false
	export let dangerous = false
</script>

<button 
	class:block 
	class:dangerous
	on:click
>
	<slot></slot>
</button>

<style>
	button{
		display: 	 	 inline-flex;
		place-items: 	 center;
		height: 	 	 2rem;
		min-width:   	 2rem;
		font-family: 	 inherit;
		gap: 		 	 0.5rem;
		justify-content: center;

	}
	.block{
		width: 100%;
	}

	button {
		background-color: black;
		color: 			  white;
		
		border-radius: 4px;
		border:		   none;
		cursor: 	   pointer;
	}

	button:hover{
		background-color: gray;
		color: 			  black;
	}

	button.dangerous{
		color: red;
	}

	button.dangerous:hover {
		background-color: red;
		color: 			  white;
	}

</style>