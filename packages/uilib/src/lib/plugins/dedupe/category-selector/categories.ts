import { SCDQueries } from "@oscd-plugins/core"

export const ElementCategorySelection = {
	["LN Type"]:   SCDQueries.SelectorLNodeType,
	["DO Type"]:   SCDQueries.SelectorDOType,
	["DA Type"]:   SCDQueries.SelectorDAType,
	["Enum Type"]: SCDQueries.SelectorEnumType,
}

export type ElementCategory = keyof typeof ElementCategorySelection
export type ElementCategories = ElementCategory[]

export type ChipElementCategory = {
	identifier: string;
	category: ElementCategory;
	counter: number;
}
export type ChipElementCategories = ChipElementCategory[]