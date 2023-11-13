import type { ElkExtendedEdge, ElkNode } from "elkjs"
import type { IEDCommInfo, MessageType } from "@oscd-plugins/core"

export type IEDNode = Omit<ElkNode, "edges"> & {
	label: string,
	isRelevant?: boolean
	isBayNode?: boolean
	edges?: IEDConnection[]
}

export function newIEDNode(iedNode: IEDNode): IEDNode {
	const newIEDNode: IEDNode = {
		...iedNode,
	}

	return newIEDNode
}

// class IEDNode implements Omit<ElkNode, "edges"> {
// 	public readonly id = ""
// 	public readonly label = ""
// 	public readonly isRelevant?: boolean
// 	public readonly isBayNode?: boolean
// 	public readonly edges?: IEDConnection[]

// 	constructor(user?: Partial<IEDNode>){
// 		const new_this: IEDNode = {
// 			...structuredClone(this),
// 			...user,
// 		}
// 		Object.setPrototypeOf(new_this, IEDNode.prototype)
// 		return new_this
// 	}
// }

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
