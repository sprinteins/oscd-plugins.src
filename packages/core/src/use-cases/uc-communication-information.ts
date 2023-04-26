import { IEDElement, InputExtRefElement, SCDQueries } from "../scd/scd-query"

/** 
 * The name is temporary, rename it if you have a better one
 */
export class UCCommunicationInformation {

	constructor(
		private readonly scdQueries: SCDQueries,
	){}

	public IEDCommInfos(): IEDCommInfo[] {

		const ieds = this.scdQueries.searchIEDs()
		const commInfos: IEDCommInfo[] = ieds.map(ied => {
			return {
				iedName:   ied.name,
				published: this.findPublishedMessages(ied),
				received:  this.findReceivedMessages(ied),
			}
		})
		return commInfos
	}
	

	private findPublishedMessages(ied: IEDElement): PublishedMessage[] {
		const published = []

		const gseControls = this.scdQueries.searchGSEControls({ root: ied.element })

		for (const gseControl of gseControls) {
			// GSEControls without a data set are irrelevant
			if (gseControl.datSet === "") { continue} 


			const message: Partial<PublishedMessage> = {}
			message.gseControlName = gseControl.name
			message.dataSetName = gseControl.datSet
			const ldevice = this.scdQueries.searchElementsLDParent(gseControl.element)
			if (!ldevice) {
				console.warn({ level: "warning", msg: "could not find GSE Control's parent LD, continuing", gseControl, ied: ied.name })
				continue
			}
			message.LDeviceInst = ldevice.inst

			// Note: need it later whe we display information about the message
			// const dataSets = this.scdQueries.searchDataSetByName(gseControl.datSet, {root:ied.element})
			const gse = this.scdQueries.searchGSE(ldevice.inst, gseControl.name)
			if (!gse) {
				console.warn({
					level:          "warning",
					msg:            "could not find GSE, continuing ",
					ldInst:         ldevice.inst,
					gseControlName: gseControl.name,
					ied:            ied.name,
				})
				continue
			}
			const subNetwork = this.scdQueries.searchElementsParentSubnetwork(gse.element)
			if (!subNetwork) {
				console.warn({ level: "warnin", msg: "could not find GSE's parent SubNetwork, continuing", gse })
				continue
			}
			message.subNetworkName = subNetwork.name

			published.push(message as PublishedMessage)
		}

		return published
	}

	private findReceivedMessages(ied: IEDElement ): ReceivedMessage[] {
		const inputs = this.scdQueries.searchInputs({ root: ied.element })
		const extRefs = inputs.map(input => this.scdQueries.searchExtRef({ root: input.element })).flat()
		
		const messages = groupInputExtRefElementsByIedNameServiceTypeAndSrcCBName(extRefs)

		return messages
	}

}

export type MessageSourceMap = {[iedName: string]: ReceivedMessage[]}


export type IEDCommInfo = {
	iedName: string
	published: PublishedMessage[]
	received: ReceivedMessage[]
}
export type PublishedMessage = {
	dataSetName: 	string
	gseControlName: string
	LDeviceInst: 	string
	subNetworkName: string
}

export type ReceivedMessage = {
	iedName: 	 string // to show
	serviceType: string // to filter
	srcCBName: 	 string // to show
	data:        InputExtRefElement[] 
}


type TempKey = {iedName: string, serviceType: string, srcCBName: string}
export function groupInputExtRefElementsByIedNameServiceTypeAndSrcCBName(
	elements: InputExtRefElement[],
): ReceivedMessage[] {
	
	const indexed: { [key: string]: {elements:InputExtRefElement[], key: TempKey} } = {}
	for (const element of elements) {
		if(element.iedName === ""){ continue }

		const key = `${element.iedName}_${element.serviceType}_${element.srcCBName}`
		const tempKey = {iedName: element.iedName, serviceType: element.serviceType, srcCBName: element.srcCBName}
        
		if (!indexed[key]) {
			indexed[key] = {elements: [], key: tempKey}
		}
        
		indexed[key].elements.push(element)
	}
    
	const grouped: ReceivedMessage[] = []
    
	for (const obj of Object.values(indexed)) {
		const {iedName, serviceType, srcCBName} = obj.key
        
		grouped.push({ iedName, serviceType, srcCBName, data: obj.elements })
	}
    
	return grouped
}