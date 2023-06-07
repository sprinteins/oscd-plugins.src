<script lang="ts">
	import "svelte-material-ui/bare.css"
	import "./fonts/google/roboto-mono-v13.css"
	import "./fonts/google/roboto-v27.css"
	import "@material/typography/mdc-typography.scss"
</script>

<tscd-theme>
	<slot />
</tscd-theme>

<style>
	:root,
	:host {
		--color-white: #ffffff;

		--color-white-dark: #f2f2f2;
		--color-yellow: #d9d800;
		--color-blue: #004552;
		--color-blue-dark: #14343e;
		--color-blue-1: #3253a8;
		--color-blue-light: #e5ecee;
		--color-torques: #007d80;
		--color-green: #288409;
		--color-black: #000000;
		--color-beige-1: burlywood;
		--color-beige-2: blanchedalmond;
		--color-beige-3: #f3ecda;
		--color-beige-4: #fcf6e5;
		--color-pink: #c73c61;
		--color-grey-1: #626262;
		--color-grey-2: #808080;
		--color-grey-3: #bdbdbd;
		--color-cyan: #2aa198;

		--color-primary: var(--color-yellow);
		--color-secondary: var(--color-blue);
		--color-text: var(--color-white);
		--color-accent: #2aa198;
		--color-text-disabled-1: rgba(0, 0, 0, 0.4);

		--border-radius: 5px;

		--font-family: "Roboto", sans-serif;
		--letter-spacing: 0.2px;
		--font-size: 12px;

		--color-ied-focus: var(--color-beige-1);
		--color-ied-focus-hover: var(--color-beige-2);

		--color-message-goose: var(--color-green);
		--color-message-mms: var(--color-blue-1);
		--color-message-sampledvalues: var(--color-pink);
		--color-message-unknown: var(--color-black);

		/* cb = colorblind */
		/* --color-message-goose-cb: #3BC40E; */
		/* --color-message-mms-cb: #00BCBF; */
		/* --color-message-sampledvalues-cb: #407CF5; */

		--sidebar-width: 400px;

		/* SMUI Variables */

		--mdc-theme-primary: var(--color-cyan);
		--mdc-typography-button-text-transform: none;
		--mdc-typography-button-font-weight: bold;
		--mdc-theme-surface: var(--color-beige-3);
	}

	:root,
	:host {
		font-family: var(--font-family);
		letter-spacing: var(--letter-spacing);
		font-size: var(--font-size);
	}
</style>
