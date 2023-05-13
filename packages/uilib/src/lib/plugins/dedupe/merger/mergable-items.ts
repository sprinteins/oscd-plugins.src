export type MergableItem = {
	label: string
	usages: ParentElement[] 
}

export type ParentElement = {
	name: string,
	type: string,
}

export const NullParentElement: ParentElement = {
	name: "",
	type: "",
}