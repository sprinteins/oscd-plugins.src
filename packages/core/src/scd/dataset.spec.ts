import {expect, suite, test} from "vitest"
import { elementToInputExtRef, SelectorInputExtRef } from "./input-extref.xml"
import { InputExtRef } from "./input-extref"
import { elementToDataSet, SelectorDataset } from "./dataset.xml"
import { DataSet } from "./dataset"
import { FCDA } from "./fcda"

suite("InputExtRef", () => {
	test("convert element to InputExtRef", () => {
		// 
		// Arrange
		// 
		const xmlStr = `<DataSet name="GooseDataSet1">
			<FCDA ldInst="CBSW" prefix="test_" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
		</DataSet>`
		const parser = new DOMParser()
    	const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
		const el = doc.querySelector(SelectorDataset)
		if(el === null){
			throw new Error("msg='could not find DataSet element'")
		}

		const expectedFCDA = new FCDA({
			ldInst:  "CBSW",
			prefix:  "test_",
			lnClass: "XSWI",
			lnInst:  "2",
			doName:  "Pos",
			daName:  "stVal",
			fc:      "ST"
		})

		const expectedInputExtRef = new DataSet({
			name:"GooseDataSet1",
			fcdas: [expectedFCDA],
		})

		// 
		// Action
		// 
		const actualDataSet = elementToDataSet(el)

		// 
		// Assert
		// 
		expect(actualDataSet).toEqual(expectedInputExtRef)
	})
})