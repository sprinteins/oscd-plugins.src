import type { IEDCommInfo } from "@oscd-plugins/core"
import type { IEDConnectionWithCustomValues, IEDNode } from "../../../components/diagram"
import { hasActiveIEDSelection, isIEDSelected, type SelectedFilter } from "../_store-view-filter"
import { Id, type Config } from "."

export function generateIEDLayout(ieds: IEDCommInfo[], edges: IEDConnectionWithCustomValues[], config: Config, selectionFilter: SelectedFilter): IEDNode[] {
	const hasSelection = hasActiveIEDSelection()

    
	const relevantEdges = edges.filter(edge => edge.isRelevant)
	const relevantNodes = new Set<string>()
	relevantEdges.forEach(edge => {
		edge.relevantIEDNames?.forEach(iedName => { relevantNodes.add(iedName) })
	})

	const children: IEDNode[] = ieds.map((ied, ii) => {
		let isRelevant = true
		if (hasSelection) {
			// TODO: smells, we should be independent of the label
			const isNodeRelevant = relevantNodes.has(ied.iedName)
			const isNodeSelected = isIEDSelected({label: ied.iedName})
			isRelevant = isNodeRelevant || isNodeSelected
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