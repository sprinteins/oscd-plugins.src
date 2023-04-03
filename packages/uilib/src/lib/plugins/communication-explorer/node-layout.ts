import ELK, { type ElkNode } from "elkjs/lib/elk.bundled";
import type { IED, IEDCommInfo } from "@oscd-plugins/core";


type Config = {
	width: number,
	height: number,
}

export async function calculateLayout(ieds: IEDCommInfo[], config: Config): Promise<ElkNode>{
	
	const children = ieds.map( (ied,ii) => {
		return {
			id: 	`ied_${ii}`,
			width:  config.width,
			height: config.height,
		}
	})
	
	const elk = new ELK()

	const graph: ElkNode = {
		id: "graph-root",
		layoutOptions: {
			"elk.algorithm": "org.eclipse.elk.layered",
			"org.eclipse.elk.layered.unnecessaryBendpoints": "true",
		},
		children,
		edges: [
			// { id: "e1", sources: [ "n1" ], targets: [ "n2" ] },
			// { id: "e1_1", sources: [ "n1" ], targets: [ "n1" ] },
			// { id: "e2", sources: [ "n1" ], targets: [ "n3" ] }
		]
	}

	const nodes = await elk.layout(graph)

	return nodes;
}