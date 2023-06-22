export class TestCommunicationInformation {

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor(
		private doc: Element,
	){}

	public findIEDsWithLnDoDaEnums() {
		const sclElement = this.doc.querySelector("SCL")
		const iedElements = this.doc.querySelectorAll("SCL > IED")
		const namespace = sclElement?.namespaceURI

		for (const iedElement of iedElements) {
			if (iedElement.baseURI !== namespace) {
				console.log(iedElement.querySelectorAll("LN > DOI, LN0 > DOI"))
			}
		}
	}

	/**
	 * 
	 * @param parent could be LDevice/Server/LN0/LN/DO/SDO/DA/BDA
	 * @returns 
	 */
	private  getDataModelChildren(parent: Element): Element[] {
		if (["LDevice", "Server"].includes(parent.tagName))
			return Array.from(parent.children).filter(
				child =>
					child.tagName === "LDevice" ||
          child.tagName === "LN0" ||
          child.tagName === "LN",
			)
  
		const id = parent.tagName === "LN" || parent.tagName === "LN0" ? parent.getAttribute("lnType") : parent.getAttribute("type")
  
		return Array.from(
			parent.ownerDocument.querySelectorAll(
				`LNodeType[id="${id}"] > DO, DOType[id="${id}"] > SDO, DOType[id="${id}"] > DA, DAType[id="${id}"] > BDA`,
			),
		)
	} 
}