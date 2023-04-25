import type { ElkExtendedEdge, ElkNode } from "elkjs";
import type { MessageType } from "@oscd-plugins/core"

export type IEDNode = Omit<ElkNode, "edges"> & {
	label: string,
	isRelevant?: boolean
	edges?: IEDConnection[]
}

export type IEDConnection = ElkExtendedEdge & {
	isRelevant?: boolean
	relevantIEDNames?: string[]
	messageType?: MessageType
}

export type RootNode = Omit<ElkNode, "children"> & {
	children: IEDNode[],
}
