import { render, screen } from "@testing-library/svelte"
import {describe, it, expect, vi} from "vitest"
import { Merger } from "."
import { fireEvent } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import type { MergableItem } from "./mergable-items"


describe("Merger", () => {
	userEvent.setup()

	const items: MergableItem[] = [
		{label: "phaseA", usages: ["LN0", "LN1"]},
		{label: "phaseB", usages: ["LN0", "LN2"]},
		{label: "phaseC", usages: []},
		{label: "phaseD", usages: ["LN3", "LN1"]},
		{label: "phaseE", usages: []},
		{label: "phaseF", usages: []},
	]
	const structure = ["Beh", "Mod", "Health", "q"]

	it("renders items, structure and affectes usage", () => {
		
		render(Merger, { items, structure })

		items.forEach( (item) => { 
			expect(screen.queryAllByText(item.label).length ).toBeGreaterThan(0)
			// item.usages.forEach( (usage) => {
			// 	expect(screen.queryAllByText(usage).length).toBeGreaterThan(0)
			// })
		})
		structure.forEach( (item) => { 
			expect(screen.queryAllByText(item).length).toBeGreaterThan(0)
		})


	})

	it("disallows merge without selection", () => {

		const handleMerge = vi.fn()
	
		const container = render(Merger, { items, structure })
		container.component.$on("merge", (e) => handleMerge(e.detail))

		const buttonMerge = screen.getByTestId("merger_button-merge")
		fireEvent.click(buttonMerge)

		expect(handleMerge).not.toHaveBeenCalled()
	})

	it("returns selections", async () => {

		// Arrange
		const handleMerge = vi.fn()
		const container = render(Merger, { items, structure })
		container.component.$on("merge", (e) => handleMerge(e.detail))

		// Act
		await fireEvent.click( screen.getByLabelText("phaseA") )
		await fireEvent.click( screen.getByLabelText("phaseB") )
		await userEvent.selectOptions( screen.getByTestId("merger_merge-target"), "0" )

		await fireEvent.click( screen.getByTestId("merger_button-merge") )

		// Assert
		expect(handleMerge).toHaveBeenCalledWith({
			selectedIndexes:          [0, 1],
			selectedMergeTargetIndex: 0,
		})
	})

	it("returns everything when selecting all", async () => {
		// Arrange
		const handleMerge = vi.fn()
		const container = render(Merger, { items, structure })
		container.component.$on("merge", (e) => handleMerge(e.detail))
	
		// Act
		await fireEvent.click( screen.getByTestId("merger_select-all") )
		await userEvent.selectOptions( screen.getByTestId("merger_merge-target"), "0" )

		await fireEvent.click( screen.getByTestId("merger_button-merge") )
	
		// Assert
		expect(handleMerge).toHaveBeenCalledWith({
			selectedIndexes:          [0, 1, 2, 3, 4, 5],
			selectedMergeTargetIndex: 0,
		})
	})

	it("cen select a merge target", async () => {
		// Arrange
		const handleMerge = vi.fn()
		const container = render(Merger, { items, structure })
		container.component.$on("merge", (e) => handleMerge(e.detail))

		// Act
		await fireEvent.click( screen.getByLabelText("phaseA") )
		await fireEvent.click( screen.getByLabelText("phaseB") )
		await userEvent.selectOptions( screen.getByTestId("merger_merge-target"), "0" )

		await fireEvent.click( screen.getByTestId("merger_button-merge") )

		// Assert
		expect(handleMerge).toHaveBeenCalledWith({
			selectedIndexes:          [0, 1],
			selectedMergeTargetIndex: 0,
		})
	})




})
