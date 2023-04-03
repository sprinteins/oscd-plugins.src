import { SelectorDataset, elementToDataSet } from "./dataset.xml"
import { IED } from "./ied"
import { SelectorInputs, elementToInputs } from "./input.xml"

export const SelectorIED = "IED"

export function elementToIED(el: Element): IED{
	const name = el.getAttribute("name") ?? ""
			
	const datasetElements = Array.from( el.querySelectorAll(SelectorDataset) )
	const dataSets = datasetElements.map(elementToDataSet) // dataset map

	const inputsElements = Array.from( el.querySelectorAll(SelectorInputs) )
	const inputs = inputsElements.map(elementToInputs).flat()

	return new IED({name, dataSets, inputs})
}