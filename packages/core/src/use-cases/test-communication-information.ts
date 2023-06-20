export class TestCommunicationInformation {

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor(){}

	public findIEDsWithLnDoDaEnums(doc: Element): Array<unknown> {
		const iedElements = doc.getElementsByTagName("IED")
		const ieds = []

		for (const iedElement of iedElements) {
			const name = this.getAttribute(iedElement, "name")
			const lnodes = this.extractNodes(iedElement)
			ieds.push({name, lnodes})
		}
		return ieds
	}

	private extractNodes(iedElement: Element): Array<unknown> {
		const lnodeElements = iedElement.getElementsByTagName("LNode, LN0")
		const lnode0Elements = iedElement.getElementsByTagName("LN0")
		const lnodes = []

		for (const lnodeElement of lnodeElements) {
			const lnClass = this.getAttribute(lnodeElement, "lnClass")
			const dos = this.extractDOs(lnodeElement)
			lnodes.push({lnClass, dos})
		}

		for (const lnodeElement of lnode0Elements) {
			const lnClass = this.getAttribute(lnodeElement, "lnClass")
			const dos = this.extractDOs(lnodeElement)
			lnodes.push({lnClass, dos})
		}
		return lnodes
	}

	private extractDOs(lnodeElement: Element): Array<unknown> {
		const doElements = lnodeElement.getElementsByTagName("DO")
		const dos = []
        
		for (const doElement of doElements) {
			const das = this.extractDAs(doElement)
			const name = this.getAttribute(doElement, "name")
			dos.push({name, das})
		}
		return dos
	}

	private extractDAs(doElement: Element): Array<unknown> {
		return []
	}

	private getAttribute(element: Element, name: string): string | null {
		return element.getAttribute(name)
	}
}