import { FCDA } from "./fcda"
import { elementToFCDA, SelectorFCDA } from "./fcda.xml"
import {expect, suite, test} from "vitest"

suite("FCDA", () => {
	test("convert element to FCDA", () => {
		// 
		// Arrange
		// 
		const xmlStr = "<FCDA ldInst=\"CircuitBreaker_CB1\" prefix=\"test\" lnClass=\"XCBR\" lnInst=\"1\" doName=\"Pos\" daName=\"stVal\" fc=\"ST\"/>"
		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
		const el = doc.querySelector(SelectorFCDA)
		if(el === null){
			throw new Error("msg='could not find FCDA element'")
		}

		const expectedFCDA = new FCDA({
			ldInst:  "CircuitBreaker_CB1",
			prefix:  "test",
			lnClass: "XCBR",
			lnInst:  "1",
			doName:  "Pos",
			daName:  "stVal",
			fc:      "ST",
		})

		// 
		// Action
		// 
		const actualFCDA = elementToFCDA(el)

		// 
		// Assert
		// 
		expect(actualFCDA).toEqual(expectedFCDA)
	})
})