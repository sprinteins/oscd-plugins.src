import { expect, suite, test } from "vitest";
import { SCDQueries } from "../scd/scd-query";
import { IEDCommInfo, UCCommunicationInformation } from "./uc-communication-information";
import { xmlStr } from "../../testfiles/simple_v5"

suite("UCCommunicationInformation", () => {
	test("IEDCommInfos", () => {

		// 
		// Arrange
		// 
		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
		const scdQueries = new SCDQueries(doc)
		const ucci = new UCCommunicationInformation(scdQueries)


		// Note: use this if you want to debug the document in browser
		// @ts-ignore
		// globalThis.scd = doc

		//
		// Action
		// 
		const iedCommInfos: IEDCommInfo[] = ucci.IEDCommInfos()
		
		// 
		// Assert
		// 
		const expectedIEDCommInfos: IEDCommInfo[] = [
			{
				iedName: "IED1",
				published: [
					{
						gseControlName: "GCB",
						dataSetName: "GooseDataSet1",
						LDeviceInst: "CircuitBreaker_CB1",
						subNetworkName: "StationBus"
					}
				],
				received: {}
			}
		]
		
		// we don't check it yet
		for(const iedCommInfo of iedCommInfos){
			iedCommInfo.received = {}
		}
		expectedIEDCommInfos.forEach( expectedInfo => expect(iedCommInfos).toContainEqual(expectedInfo) )
	})
})
