import { suite, test, expect } from "vitest"
import { SCD } from "./scd"
import { IED } from "./ied"
import { DataSet } from "./dataset"
import { FCDA } from "./fcda"
import { Input } from "./input"
import { InputExtRef } from "./input-extref"

suite("SCD", () => {
	test("extract IEDs", () => {
		
		// 
		// Arrange
		// 
		const xmlStr =`<IED name="IED1" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
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
		// Act
		// 
		const scd = SCD.FromXMLString(xmlStr)
		if(!scd){
			throw new Error("scd expected")
		}
		const ieds = scd.extractIEDs()
		console.log({level: "test", msg: "extract ieds", ieds})
		// 
		// Assert
		// 
		// expectedIEDs.forEach(expedtedIED => expect(ieds).toContainEqual(expedtedIED))
		expect(ieds).toContainEqual(expectedIED)

	})
})
