import ELK, { type ElkNode } from "elkjs/lib/elk.bundled"
import type { IEDNode, RootNode } from "../components/diagram"

const config = {
	width:  100,
	height: 30,
}


export async function generateMockRootNode(): Promise<RootNode>{

	let id=-1
	function ID(){
		id++
		return String(id)
	}
	
	function Label(prefix = "IED "){
		return prefix + String(id)
	}
	
	const children: IEDNode[] = [
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		
		{id: ID(), width: 12*(config.width+20), height: 30, label: Label("bus"), x: 10, y: 10},
		
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
	
		{id: ID(), width: 12*(config.width+20), height: 30, label: Label("bus2")},
		
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
		{id: ID(), width: config.width, height: config.height, label: Label()},
	
	]
	
	let edgeId=0
	function EdgeID(){
		return String(edgeId++)
	}
	
	const edges = [
		{id: EdgeID(), sources: ["1"], targets: ["2"]},
		{id: EdgeID(), sources: ["2"], targets: ["1"]},
		{id: EdgeID(), sources: ["2"], targets: ["3"]},
		{id: EdgeID(), sources: ["1"], targets: ["3"]},
		{id: EdgeID(), sources: ["6"], targets: ["7"]},
		{id: EdgeID(), sources: ["6"], targets: ["5"]},
		{id: EdgeID(), sources: ["6"], targets: ["6"]},
		{id: EdgeID(), sources: ["6"], targets: ["9"]},
		{id: EdgeID(), sources: ["0"], targets: ["7"]},
	
		{id: EdgeID(), sources: ["20"], targets: ["13"]},
		{id: EdgeID(), sources: ["21"], targets: ["13"]},
		{id: EdgeID(), sources: ["22"], targets: ["13"]},
		{id: EdgeID(), sources: ["23"], targets: ["13"]},
		{id: EdgeID(), sources: ["24"], targets: ["13"]},
		{id: EdgeID(), sources: ["25"], targets: ["13"]},
		{id: EdgeID(), sources: ["26"], targets: ["13"]},
		{id: EdgeID(), sources: ["27"], targets: ["13"]},
		{id: EdgeID(), sources: ["28"], targets: ["13"]},
		{id: EdgeID(), sources: ["29"], targets: ["13"]},
		
		{id: EdgeID(), sources: ["31"], targets: ["30"]},
		{id: EdgeID(), sources: ["32"], targets: ["30"]},
		{id: EdgeID(), sources: ["33"], targets: ["30"]},
		{id: EdgeID(), sources: ["34"], targets: ["30"]},
		{id: EdgeID(), sources: ["35"], targets: ["30"]},
		{id: EdgeID(), sources: ["36"], targets: ["30"]},
		{id: EdgeID(), sources: ["37"], targets: ["30"]},
		{id: EdgeID(), sources: ["38"], targets: ["30"]},
		{id: EdgeID(), sources: ["39"], targets: ["30"]},
	
		{id: EdgeID(), sources: ["31"], targets: ["13"]},
		{id: EdgeID(), sources: ["32"], targets: ["13"]},
		{id: EdgeID(), sources: ["33"], targets: ["13"]},
		{id: EdgeID(), sources: ["34"], targets: ["13"]},
		{id: EdgeID(), sources: ["35"], targets: ["13"]},
		{id: EdgeID(), sources: ["36"], targets: ["13"]},
		{id: EdgeID(), sources: ["37"], targets: ["13"]},
		{id: EdgeID(), sources: ["38"], targets: ["13"]},
		{id: EdgeID(), sources: ["39"], targets: ["13"]},
		{id: EdgeID(), sources: ["39"], targets: ["13"]},
		
	]
	
	const elk = new ELK()
	
	// https://www.eclipse.org/elk/reference/algorithms.html
	const graph: ElkNode = {
		id:            "graph-root",
		layoutOptions: {
			"elk.algorithm":                                           "org.eclipse.elk.layered",
			"org.eclipse.elk.direction":                               "UP",
			"org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment": "LEFTDOWN",
		},
		children,
		edges,
	}
	
	return elk.layout(graph) as Promise<RootNode>
}
