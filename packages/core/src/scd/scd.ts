import { elementToIED, SelectorIED } from "./ied.xml"
import { IED } from "./ied"

export class SCD {

	private constructor(
		private readonly doc: Element,
	){}

	public static FromXMLString(xml: string): SCD | undefined{
		
		const parser = new DOMParser()
		const doc = parser.parseFromString(xml, "text/xml") as unknown as Element
		
		const newSCD = new SCD(doc)
		return newSCD
	}

	public extractIEDs(): IED[] {
		const iedElements = Array.from(this.doc.querySelectorAll(SelectorIED))
		const ieds = iedElements.map(elementToIED)
		
		return ieds
	}
}

