import type { SCDQueries } from "../scd"

export interface IPInfo {
	ip: string
	ipSubnet: string
	ipGateway: string
}

export interface SubnetworkConnection extends IPInfo {
	subnetwork: string
}

export type IEDNetworkInfo = {
	iedName: string
	subneworkConnections: SubnetworkConnection[]
}

export class UCNetworkInformation {
	constructor(
		private readonly scdQueries: SCDQueries,
	){}

	private ipAttributes = {
		ip:        "IP",
		ipSubnet:  "IP-SUBNET",
		ipGateway: "IP-GATEWAY",
	}

	public IEDNetworkInfo(): IEDNetworkInfo[] {

		const ieds = this.scdQueries.searchIEDs()
		const networkInfo: IEDNetworkInfo[] = ieds.map(ied => {
			const connectedAPs = this.scdQueries.getConnectedAPByIEDName(ied.name)

			const subneworkConnections: SubnetworkConnection[] = []
			for (const connectedAP of connectedAPs) {
				if (connectedAP != null){
					const subnetwork = connectedAP.closest("SubNetwork")
					const subnetworkName = subnetwork?.getAttribute("name")

					const ipInfo = this.IPInfoFromAP(connectedAP)
	
					if (subnetwork != null && subnetworkName != null) {
						subneworkConnections.push({
							subnetwork: subnetworkName,
							ip:         ipInfo?.ip ?? "",
							ipSubnet:   ipInfo?.ipSubnet ?? "",
							ipGateway:  ipInfo?.ipGateway ?? "",
						})
					}
				}
			}

			return {
				iedName: ied.name,
				subneworkConnections,
			}
		})
		return networkInfo
	}

	public IEDNetworkInfosByBay(): Map<string, IEDNetworkInfo[]> {
		const ieds = this.IEDNetworkInfo()

		const baysWithIEDs = new Map<string, IEDNetworkInfo[]>()
		ieds.forEach((ied) => {
			const bayNames = this.scdQueries.getBaysByIEDName(ied.iedName)
			
			bayNames.forEach((bayName) => {
				let setList: IEDNetworkInfo[] | undefined = []

				if (!baysWithIEDs.has(bayName)) 
					baysWithIEDs.set(bayName, [])

				setList = baysWithIEDs.get(bayName)
				setList?.push(ied)
			})
		})

		return baysWithIEDs
	}

	private IPInfoFromAP(apElement: Element): IPInfo | null {
		const ipInfo: IPInfo = {
			ip:        "",
			ipSubnet:  "",
			ipGateway: "",
		}

		const addressQuery = "Address"
		const address = apElement.querySelector(addressQuery)

		if (!address) {
			return null
		}

		const addressEntries = address.querySelectorAll("P")

		for (const addressEntry of addressEntries) {
			const type = addressEntry.getAttribute("type")

			if (!type) {
				continue
			}

			if (type === this.ipAttributes.ip) {
				const ip = addressEntry.innerHTML
				ipInfo.ip = ip
			} else if (type === this.ipAttributes.ipGateway) {
				const ip = addressEntry.innerHTML
				ipInfo.ipGateway = ip
			} else if (type === this.ipAttributes.ipSubnet) {
				const ip = addressEntry.innerHTML
				ipInfo.ipSubnet = ip
			}
		}

		return ipInfo
	}
}
