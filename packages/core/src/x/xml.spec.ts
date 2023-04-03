import { suite, test, expect } from "vitest"
import { xmlToObj } from "./xml"
import {z} from "zod"

suite("XML", () => {
	test("convert xml to js object", async () => {

    const xmlStr = '<q data-testid="hello" id="a"><bool value="true" /><span id="b">hey!</span><span id="C">hey2!</span></q>';

	const expectedSchema = z.object({
		q: z.object({
			$: z.object({ 'data-testid': z.string(), id: z.string() }),
			bool: z.object({
				$: z.object({value: z.string()}),
			}),
			span: z.array(z.object({
				$: z.object({'id': z.string()}),
				"#text": z.object({ "#text": z.string() })
			}))
		})	
	})
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlStr, "application/xml") as unknown as Element
    const obj = xmlToObj(doc)
	expectedSchema.parse(obj)

	})
})

