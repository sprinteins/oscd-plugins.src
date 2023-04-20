import type { ElkExtendedEdge, ElkNode } from "elkjs";

export type IEDNode = Omit<ElkNode, "edges"> & {
	label: string,
	isRelevant?: boolean
	edges?: IEDConnection[]
}

export type IEDConnection = ElkExtendedEdge & {
	isRelevant?: boolean
	relevantIEDNames?: string[]
}

export type RootNode = Omit<ElkNode, "children"> & {
	children: IEDNode[],
}