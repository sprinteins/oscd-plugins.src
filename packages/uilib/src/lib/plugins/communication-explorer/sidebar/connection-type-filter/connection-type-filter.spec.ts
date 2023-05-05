import { render, screen, fireEvent, act } from "@testing-library/svelte"
import {describe, it, expect } from "vitest"

import ConnectionFilter  from "./connection-type-filter.svelte"



describe("Sidebar Connection Filter", () => {

	type TestCase = {
		desc: string,
		isFilterDisabledExpected: boolean,
	}

	const featureTests: TestCase[] = [
		{
			desc:                     "filter disable variable is truthy",
			isFilterDisabledExpected: false,
		},
		{
			desc:                     "filter disable variable is falsy",
			isFilterDisabledExpected: true,
		},
	]

	featureTests.forEach(testShouldFiltersBeDisabled)

	function testShouldFiltersBeDisabled(tc: TestCase) {
		it(tc.desc, () => {
	
			render(ConnectionFilter, { 
				isIedFiltersDisabled:    tc.isFilterDisabledExpected, 
				showIncomingConnections: true, 
				showOutgoingConnections: true, 
			})

			const element = screen.getByTestId("exampleFilterToBeChecked") as HTMLInputElement
			expect(element).toBeDefined

			if(tc.isFilterDisabledExpected) {
				expect(element.disabled).toBeTruthy()
			} else {
				expect(element.disabled).toBeFalsy()
			}
            
		})
	}

})
