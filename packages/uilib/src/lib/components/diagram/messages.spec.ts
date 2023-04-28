import { render, screen, fireEvent, act } from "@testing-library/svelte"
import {describe, it, expect } from "vitest"

import Message  from "./message.svelte"
import type { IEDConnection } from "./nodes"



describe("Messages", () => {
	it("renders", async () => {

		const isSelected = false
	
		const connection: IEDConnection = {
			id:       "not_relevant",
			sources:  [],
			targets:  [],
			sections: [
				{
					id:         "connection",
					startPoint: {x: 0, y: 0},
					endPoint:   {x: 0, y: 200},
					bendPoints: [],
				},
			],
		}

		render(Message, { edge: connection, isSelected })
		const element = screen.getByTestId("connection")
		expect(element).toBeDefined
		expect(element.classList.contains("show-selected-path")).toBeFalsy
	})

	it("renders", async () => {

		const isSelected = true
	
		const connection: IEDConnection = {
			id:       "not_relevant",
			sources:  [],
			targets:  [],
			sections: [
				{
					id:         "connection",
					startPoint: {x: 0, y: 0},
					endPoint:   {x: 0, y: 200},
					bendPoints: [],
				},
			],
		}

		render(Message, { edge: connection, isSelected })
		const element = screen.getByTestId("connection")
		expect(element).toBeDefined
		expect(element.classList.contains("show-selected-path")).toBeTruthy
	})

})
