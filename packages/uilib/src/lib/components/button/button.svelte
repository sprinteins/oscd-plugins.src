
<script lang="ts">

	import '@material/mwc-button';

	// Input
	export let block = false
	export let dangerous = false
	export let label: string
	export let testid = ""
	export let disabled = false
	export let type: "primary" | "secondary" | "tertiary" = "primary"

</script>

<mwc-button
	label={label}
	disabled={disabled}
	on:click={console.log}
	on:keypress
	primary
	outlined
></mwc-button>

<button
	class:block
	class:dangerous
	class={`tscd-button ${type}`}
	{disabled}
	on:click
	data-testid={testid}
>
	{label}
</button>

<style lang="scss" global>

	:root{
		--mdc-typography-button-font-size: 12px;
  		--mdc-typography-button-text-transform: none;
	}

	button.tscd-button{
		--padding: 0.5rem;
		display: 	 	 inline-flex;
		place-items: 	 center;
		padding: var(--padding) calc(var(--padding) * 2);
		font-family: 	 inherit;
		gap: 		 	 0.5rem;
		justify-content: center;
		letter-spacing:  2%;
		line-height: 	 100%;

		background-color: black;
		color: 			  white;
		
		border-radius: 4px;
		border:		   none;
		cursor: 	   pointer;
		transition: all 100ms ease-in-out;


		&:hover{
			background-color: var(--color-gray-1);
			color: 			  black;
		}

		&.block{
			width: 100%;
		}
		
		&.primary,
		&.secondary,
		&.tertiary {
			&.dangerous{
				color: var(--color-pink);
		
				&:hover{
					background-color: var(--color-pink);
					color: 			  var(--color-white);
				}
			}

			&:disabled,
			&:disabled:hover {
				background-color: var(--color-grey-3);
				color: 			  var(--color-grey-1)
			}
		}

		&.primary{
			background-color: var(--color-blue-dark);
			color: 			  var(--color-white);
			border: 		  var(--color-blue-dark) thin solid;
		}

		&.primary:hover{
			background-color: var(--color-blue);
			color: 			  var(--color-yellow);
		}

		&.primary:active {
			background-color: var(--color-blue-light);
			color: 			  var(--color-black)
		}

		&.secondary{
			background-color: var(--color-white);
			color: 			  var(--color-blue);
			border: 		  black thin solid;
		}

		&.secondary:hover{
			background-color: var(--color-blue-light);
		}

		&.secondary:active {
			background-color: var(--color-blue-dark);
			color: 			  var(--color-yellow)
		}

		&.tertiary{
			background: none;
			border: 	none;
			color: 		var(--color-blue);
		}

		&.tertiary:hover{
			background: var(--color-blue-light);
		}
		
		&.tertiary:active{
			background: var(--color-blue);
			color: 		var(--color-white)
		}
		
		&.tertiary:disabled,
		&.tertiary:disabled:hover {
			background: none;
		}
	}

</style>