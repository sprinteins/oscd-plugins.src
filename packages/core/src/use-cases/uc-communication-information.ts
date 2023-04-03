import { InputExtRefElement, SCDQueries } from "../scd/scd-query";

/**
 * 1. query ied=`IED[name="${iedName}"]`
 * 2. gseControl=ied.queryAll `GSEControl`
 * 	2.1 ied.query `DataSet[name="${gseControl.datSet}"]`
 * 3. ld = gseContro.closes("LDevice")
 * 4.  subnetwork = document.query `SubNetwork ConnectedAP[iedName="${ied.name}"] GSE[ldInst="${ld.inst}"][cbName="${gseControl.name}"]`
 * 
 * The name is temporary, rename it if you have a better one
 */
export class UCCommunicationInformation {

	constructor(
		private readonly scdQueries: SCDQueries
	){}

	// public IEDCommInfo(): IEDCommInfo[]{
	// 	return []
	// }

	public IEDCommInfos(): IEDCommInfo[] {

		const commInfos: Partial<IEDCommInfo>[] = []

		const ieds = this.scdQueries.searchIEDs()
		
		
		for(let ied of ieds){
			const iedCommInfo: Partial<IEDCommInfo> = {}
			//  `IEDCommInfo.iedName`
			iedCommInfo.iedName = ied.name

			// 
			// Received messages
			// 
			const inputs = this.scdQueries.searchInputs({root: ied.element})
			const extRefs = inputs.map( input => this.scdQueries.searchExtRef({root: input.element})).flat()
			const iedBuckets: {[iedName: string]: InputExtRefElement[]}= {}
			for(const extRef of extRefs){
				const iedName = extRef.iedName
				if(iedName === ""){ continue }
				if( !iedBuckets[iedName] ){
					iedBuckets[iedName] = []
				}
				iedBuckets[iedName].push(extRef)
			}
			iedCommInfo.received = {}
			Object.keys(iedBuckets).forEach(iedName => {
				const messages = iedBuckets[iedName].map( msg => {
					return {
						iedName: 	 msg.iedName,
						srcCBName: 	 msg.srcCBName,
						serviceType: msg.serviceType,
					}
				})
				iedCommInfo.received![iedName] = messages
			})
			
			
			// 
			// Published Messages
			// 
			// `IEDCommInfo.published`
			iedCommInfo.published = []
			
			const gseControls = this.scdQueries.searchGSEControls({root:ied.element})
			
			for(let gseControl of gseControls){
				// GSEControls without a data set are irrelevant
				if(gseControl.datSet === ""){ continue }


				const message: Partial<PublishedMessage> = {}
				message.gseControlName = gseControl.name 
				message.dataSetName = gseControl.datSet
				const ldevice = this.scdQueries.searchElementsLDParent(gseControl.element)
				if(!ldevice){
					console.warn({level:"warning", msg:"could not find GSE Control's parent LD, continuing", gseControl, ied: ied.name})
					continue
				}
				message.LDeviceInst = ldevice.inst

				// Note: need it later whe we display information about the message
				// const dataSets = this.scdQueries.searchDataSetByName(gseControl.datSet, {root:ied.element})
				const gse = this.scdQueries.searchGSE(ldevice.inst, gseControl.name)
				if(!gse){
					console.warn({
						level:"warning", 
						msg:"could not find GSE, continuing ", 
						ldInst: ldevice.inst,
						gseControlName: gseControl.name,
						ied: ied.name,
					})
					continue
				}
				const subNetwork = this.scdQueries.searchElementsParentSubnetwork(gse.element)
				if(!subNetwork){
					console.warn({level:"warnin", msg:"could not find GSE's parent SubNetwork, continuing", gse})
					continue
				}
				message.subNetworkName = subNetwork.name

				iedCommInfo.published.push(message as PublishedMessage)
			}
			
			
			
			commInfos.push(iedCommInfo as IEDCommInfo)
		}

		return commInfos as IEDCommInfo[]
	}
	
}


export type IEDCommInfo = {
	iedName: string
	published: PublishedMessage[]
	received: {[iedName: string]: ReceivedMessage[]}
}
export type PublishedMessage = {
	dataSetName: 	string
	gseControlName: string
	LDeviceInst: 	string
	subNetworkName: string
}

export type ReceivedMessage = {
	iedName: 	 string // to show
	srcCBName: 	 string // to show
	serviceType: string // to filter
}