import { describe, expect, it } from "vitest"
import { xmlStr } from "../../testfiles/simple_v5"
import { SCDQueries } from "../scd"
import { UC_Type_Dedupe } from "./uc-type-dedupe"

describe("UC: Type Dedupe", () => {
	it("finds duplicate Object Types", async () => {
		// 
		// Arrange
		// 
		const parser = new DOMParser()
		const doc = parser.parseFromString(xmlStr, "text/xml") as unknown as Element
		const scdQueries = new SCDQueries(doc)
		const uc = new UC_Type_Dedupe(scdQueries)

		// 
		// Act
		// 
		const duplicate_types = await uc.find_duplicate_object_types()
		console.log({level: "test", msg: "duplicate types", duplicate_types})

		expect(duplicate_types.length).toEqual(2)
		expect(duplicate_types[0].length).toEqual(2)
		expect(duplicate_types[1].length).toEqual(3)
	})
})