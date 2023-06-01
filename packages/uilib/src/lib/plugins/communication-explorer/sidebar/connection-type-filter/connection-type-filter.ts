import type { ButtonGroupOption } from "../../../../components/button-group"
import { changeMessageConnectionFilterDirection } from "../../_store-view-filter"

export type Options = ButtonGroupOption & {
		incoming: boolean;
		outgoing: boolean;
	};

export const options: Options[] = [
	{
		value:    "incoming",
		label:    "Incoming",
		incoming: true,
		outgoing: false,
	},
	{
		value:    "outgoing",
		label:    "Outgoing",
		incoming: false,
		outgoing: true,
	},
	{ value: "both", label: "Both", incoming: true, outgoing: true },
]

export function handleChange(e: CustomEvent<{ index: number }>): number {
	const selectedIndex = e.detail.index
	const selectedOption = options[selectedIndex]

	changeMessageConnectionFilterDirection(
		selectedOption.incoming,
		selectedOption.outgoing,
	)

	return selectedIndex
}