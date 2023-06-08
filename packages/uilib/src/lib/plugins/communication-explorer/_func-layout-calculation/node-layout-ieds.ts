import type { IEDCommInfo } from "@oscd-plugins/core"
import type { IEDConnectionWithCustomValues, IEDNode } from "../../../components/diagram"
import type { SelectedFilter } from "../_store-view-filter"
import { Id, type Config } from "."

export function generateIEDLayout(ieds: IEDCommInfo[], edges: IEDConnectionWithCustomValues[], config: Config, selectionFilter: SelectedFilter): IEDNode[] {
	const hasSelection = Boolean(selectionFilter.selectedIEDs)
    
	const relevantEdges = edges.filter(edge => edge.isRelevant)
	const relevantNodes = new Set<string>()
	relevantEdges.forEach(edge => {
		edge.relevantIEDNames?.forEach(iedName => { relevantNodes.add(iedName) })
	})

	const children: IEDNode[] = ieds.map((ied, ii) => {
		let isRelevant = true
		if (hasSelection) {
			// TODO: smells, we should be independent of the label
			isRelevant = relevantNodes.has(ied.iedName) || selectionFilter.selectedIEDs?.some(selectedIED => selectedIED.label === ied.iedName)
		}

		return {
			id:         Id(ii),
			width:      config.width,
			height:     config.height,
			label:      ied.iedName,
			isRelevant: isRelevant,
		}
	})

	return children
}