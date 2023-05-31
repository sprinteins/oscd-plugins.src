<script lang="ts">
	import { Button } from "../button"
	import { Icons, openSCDIcons } from "../icons"

	export let type = "unknown"

	const variantLabel: { [key in typeof type]: string } = {
		goose:         "GOOSE",
		mms:           "MMS",
		reportcontrol: "MMS",
		sampledvalues: "SMV",
		smv:           "SMV",
	}

	const variantClass: { [key in typeof type]: string } = {
		goose:         "goose",
		mms:           "mms",
		reportcontrol: "mms",
		sampledvalues: "sampledvalues",
		smv:           "sampledvalues",
	}

	const variantIconName: { [key in typeof type]: keyof typeof openSCDIcons } =
		{
			goose:         "gooseIcon",
			mms:           "reportIcon",
			reportcontrol: "reportIcon",
			sampledvalues: "smvIcon",
			smv:           "smvIcon",
		}
</script>

<div class="chip-size">
	<Button
		componentClasses={"tscd-button tscd-button-service-type-" +
			variantClass[type]}
	>
		<div class="tscd-button-chip">
			<Icons name={variantIconName[type]} size={"small"} />
			<span>{variantLabel[type]}</span>
		</div>
	</Button>
</div>

<style lang="scss">
	$size: 0.8rem;
	.chip-size {
		span {
			font-size: $size;
			display: block;
		}
		:global(button.tscd-button) {
			padding: 0.1rem 0.3rem;
		}
		:global(div.icon-size svg) {
			height: $size;
			width: $size;
		}
		:global(div.icon-size) {
			height: $size;
			width: $size;
		}
	}

	div.tscd-button-chip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
	}

	:global(button.tscd-button) {
		print-color-adjust: exact;
		-webkit-print-color-adjust: exact;
	}
	:global(button.tscd-button-service-type-goose) {
		background-color: var(--color-message-goose) !important;
	}
	:global(button.tscd-button-service-type-mms) {
		background-color: var(--color-message-mms) !important;
	}
	:global(button.tscd-button-service-type-sampledvalues) {
		background-color: var(--color-message-sampledvalues) !important;
	}
	:global(button.tscd-button-service-type-undefined) {
		background-color: var(--color-black) !important;
	}
</style>
