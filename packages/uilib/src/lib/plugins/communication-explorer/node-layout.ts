import ELK, { type ElkNode } from "elkjs/lib/elk.bundled";
import type { IED, IEDCommInfo } from "@oscd-plugins/core";


type Config = {
	width: number,
	height: number,
}

export async function calculateLayout(ieds: IEDCommInfo[], config: Config): Promise<ElkNode>{
	
	const children = ieds.map( (ied,ii) => {
		return {
			id: 	Id(ii),
			width:  config.width,
			height: config.height,
		}
	})

	const edges = ieds.map( (ied, ii) => {
		return Object.keys(ied.received).map( sourceIEDName => {
			const sourceIEDIndex = ieds.findIndex((sourceIED) => sourceIED.iedName === sourceIEDName)
			return {
				id: `connection_${Id(sourceIEDIndex)}_${Id(ii)}`,
				sources: [Id(sourceIEDIndex)],
				targets: [Id(ii)]
			}
		})
	}).flat()
	
	const elk = new ELK()

	// https://www.eclipse.org/elk/reference/algorithms.html
	const graph: ElkNode = {
		id: "graph-root",
		layoutOptions: {
			// "elk.algorithm": "org.eclipse.elk.force",
			// "elk.algorithm": "org.eclipse.elk.stress",
			"elk.algorithm": "org.eclipse.elk.layered",
			// "elk.algorithm": "org.eclipse.elk.mrtree",
			// "elk.algorithm": "org.eclipse.elk.radial",
			"org.eclipse.elk.layered.unnecessaryBendpoints": "true",
		},
		children,
		edges,
	}

	const nodes = await elk.layout(graph)

	return nodes;
}

function Id(something:unknown): string {
	return `ied-${something}`
}

