import { DataSet } from "./dataset"
import { elementToFCDA, SelectorFCDA } from "./fcda.xml"

export const SelectorDataset ="DataSet"

export function elementToDataSet(el: Element): DataSet{
	const fcdaElements = Array.from( el.querySelectorAll(SelectorFCDA) )
	const fcdas = fcdaElements.map(elementToFCDA)

	const name = el.getAttribute("name") ?? ""
	return new DataSet({name, fcdas})
}