import { render, screen } from "@testing-library/svelte"
import {describe, it, expect, vi} from "vitest"
import { GroupCardList } from "."
import { fireEvent } from "@testing-library/svelte"


describe("Group Card List", () => {

	const itemSets: string[][] = [
		["phaseA", "phaseB", "phaseC","phaseD","phaseE","phaseF"],
		["phaseA", "phaseB", "phaseC","phaseD"],
		["phaseA", "phaseB", "phaseC","phaseD","phaseF"],
	]

	it("Select a group", async () => {

		const handleSelect = vi.fn()
	
		const container = render(GroupCardList, { itemSets })
		container.component.$on("select", (e) => handleSelect(e.detail))

		const card = screen.getByTestId("card_0")
		expect(card).toBeTruthy()
		await fireEvent.click(card)

		expect(handleSelect).toHaveBeenCalledWith({index: 0})
		expect(Array.from(card.classList)).toContain("selected")
	})

})