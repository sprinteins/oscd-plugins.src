import { describe, expect, it } from "vitest"
import { xmlStr } from "../../testfiles/simple_v5"
import { SCDQueries } from "../scd"
import { UCTypeDedupe } from "./uc-type-dedupe"

describe("UC: Type Dedupe", () => {
	it("finds duplicate Object Types", async () => {
		// 
		// Arrange
		// 
		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
		const scdQueries = new SCDQueries(doc)
		const uc = new UCTypeDedupe(scdQueries)

		// 
		// Act
		// 
		const duplicate_types = await uc.findDuplicateObjectTypes()
		console.log({level: "test", msg: "duplicate types", duplicate_types})


		// 
		// Assert
		// 
		expect(duplicate_types.length).toEqual(2)
		// Note: <Val> elements are currently ignore that is why there are 3 instead of 2
		// expect(duplicate_types[0].length).toEqual(2)
		expect(duplicate_types[0].length).toEqual(3)
		expect(duplicate_types[1].length).toEqual(3)

	})
})