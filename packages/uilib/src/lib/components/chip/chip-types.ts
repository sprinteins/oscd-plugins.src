import type { ChipElementCategory } from "../../plugins/dedupe/category-selector/categories"

export type ChipContents = ChipContent[];
export type ChipContent = {
		identifier: string;
		label: string;
		counter?: number;
	};

export type ChipSelectedEventValue = {
	identifier: string
}

export function newChipContentFromCategories(
	category: ChipElementCategory): ChipContent {
	return {
		identifier: category.identifier,
		label:      category.category,
		counter:    category.counter,
	}
}