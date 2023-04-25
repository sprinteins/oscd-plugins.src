import {expect, suite, test} from "vitest"
import { InputExtRef } from "./input-extref"
import { DataSet } from "./dataset"
import { FCDA } from "./fcda"
import { elementToIED, SelectorIED } from "./ied.xml"
import { IED } from "./ied"
import { Input } from "./input"

suite("IED", () => {
	test("convert element to IED", () => {
		// 
		// Arrange
		// 
		const xmlStr = `<IED name="IED1" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
			<AccessPoint name="P1">
				<Server>
					<Authentication none="true"/>
					<LDevice inst="CircuitBreaker_CB1">
						<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
							<DataSet name="GooseDataSet1">
								<FCDA ldInst="CBSW" prefix="test_" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							</DataSet>
							<GSEControl type="GOOSE" appID="0001" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
								<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="CSWI" lnInst="1">IED2</IEDName>
							</GSEControl>
							<GSEControl type="GOOSE" appID="0003" fixedOffs="false" confRev="1" name="GCB2"/>
							<Inputs>
								<ExtRef iedName="IED1" serviceType="GOOSE" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1" prefix="test_" doName="Pos" daName="stVal" srcLDInst="CircuitBreaker_CB1" srcPrefix="test01_" srcLNClass="LLN0" srcCBName="GCB"/>
							</Inputs>
						</LN0>
					</LDevice>
				</Server>
			</AccessPoint>
		</IED>`
		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
		const el = doc.querySelector(SelectorIED)
		if(el === null){
			throw new Error("msg='could not find IED element'")
		}

		const expectedIED = new IED({
			name:     "IED1",
			dataSets: [new DataSet({
				name:  "GooseDataSet1",
				fcdas: [new FCDA({
					ldInst:  "CBSW",
					prefix:  "test_",
					lnClass: "XSWI",
					lnInst:  "2",
					doName:  "Pos",
					daName:  "stVal",
					fc:      "ST",
				})],
			})],
			inputs: [new Input({
				iedName: "IED1",
				extRefs: [new InputExtRef({
					iedName:     "IED1",
					serviceType: "GOOSE",
					ldInst:      "CircuitBreaker_CB1",
					lnClass:     "XCBR",
					lnInst:      "1",
					prefix:      "test_",
					doName:      "Pos",
					daName:      "stVal",
					srcLDInst:   "CircuitBreaker_CB1",
					srcPrefix:   "test01_",
					srcLNClass:  "LLN0",
					srcCBName:   "GCB",
				})],
			})],
		})

		// 
		// Action
		// 
		const actualIED = elementToIED(el)

		// 
		// Assert
		// 
		expect(actualIED).toEqual(expectedIED)
	})
})