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
		const duplicateTypes = await uc.findDuplicateObjectTypes()
		console.log({leve: "test", duplicateTypes})

		// 
		// Assert
		// 
		expect(duplicateTypes.length).toEqual(1)
		expect(duplicateTypes[0].length).toEqual(3)

	})
})