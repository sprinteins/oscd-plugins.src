import type { ElkExtendedEdge, ElkNode } from "elkjs"
import type { IEDCommInfo, MessageType } from "@oscd-plugins/core"

export type IEDNode = Omit<ElkNode, "edges"> & {
	label: string,
	isRelevant?: boolean
	isBayNode?: boolean
	edges?: IEDConnection[]
}

export type IEDConnection = ElkExtendedEdge & {
	isRelevant?: boolean
	relevantIEDNames?: string[]
	messageType?: MessageType
	messageTypeLabel?: string
}

export type IEDConnectionWithCustomValues = IEDConnection & {
	sourceIED: IEDCommInfo
	targetIED: IEDCommInfo
}

export type RootNode = Omit<ElkNode, "children" | "edges"> & {
	children: Array<IEDNode | BayNode>,
	edges?: IEDConnectionWithCustomValues[]
}

export type SubnetworkEdge = ElkExtendedEdge & {
	isRelevant?: boolean
}

export type BayNode = Omit<ElkNode, "children"> & {
	label: string;
	isBayNode: boolean;
	children: IEDNode[]
}

export function isBayNode(node: IEDNode | BayNode): node is BayNode {
	return Boolean(node.isBayNode)
}
