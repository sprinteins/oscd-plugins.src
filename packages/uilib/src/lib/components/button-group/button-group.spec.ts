import { render, screen } from "@testing-library/svelte"
import {describe, it, expect} from "vitest"

import { ButtonGroup, type ButtonGroupOption } from "./"

const options: ButtonGroupOption[] = [
	{ id: "option1", label: "🍕 Pizza" },
	{ id: "option2", label: "🍜 Noodles" },
	{ id: "option3", label: "🍫 Chocolate" },
]

describe("Button Group", () => {
	it("renders options", () => {

		render(ButtonGroup, { options })
		const list = screen.getByTestId("button-group")
		expect(list.children).lengthOf(options.length)

		expect(list.children.item(0)?.querySelector("div.btn")?.textContent).toBe("🍕 Pizza")
		expect(list.children.item(1)?.querySelector("div.btn")?.textContent).toBe("🍜 Noodles")
		expect(list.children.item(2)?.querySelector("div.btn")?.textContent).toBe("🍫 Chocolate")

	})

	it("is disabled", () => {

		render(ButtonGroup, { options, disabled: true })
		const list = screen.getByTestId("button-group")
		expect(Array.from(list.classList)).toContain("disabled")
	})

	it("is not disabled", () => {

		render(ButtonGroup, { options, disabled: false })
		const list = screen.getByTestId("button-group")
		expect(Array.from(list.classList)).not.toContain("disabled")
	})

	it("default selection", () => {

		render(ButtonGroup, { options, disabled: false, selectedID: "option2" })
		const list = screen.getByTestId("button-group")

		const selectedElement = list.querySelector("input[name=\"option\"]:checked") as HTMLInputElement
		expect(selectedElement.value).toBe("option2")
	})
})
