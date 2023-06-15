/* eslint-disable no-mixed-spaces-and-tabs */
import { describe, expect, it } from "vitest"
import { FilterChip } from "../../../../components/filter-chip"
import { render, screen } from "@testing-library/svelte"

describe("Connection Type Filter", () => {
	describe("Incoming Publisher", () => {

        type TestCase = {
            desc: string
            label: string
            value: string
            incoming: boolean
            outgoing?: boolean 
            expectedIncoming: boolean 
            expectedOutgoing?: boolean 
            expectedClasses?: string[]
			isSelected: boolean
        }

        const featureTests: TestCase[] = [
        	{
        		desc:             "incoming chip has incoming === true",
        		label:            "Publisher",
        		value:            "Publisher",
        		incoming:         true,
        		expectedIncoming: true,
        		isSelected:       true,
        	},
        ]

        featureTests.forEach(testFeature)

        function testFeature(tc: TestCase) {
        	it(tc.desc, () => {
        		//
        		// Arrange
        		//
        		const options = {
        			id:         "Publisher",
        			label:      tc.label,
        			incoming:   false,
        			outgoing:   false,
        			isSelected: true,

        		}

        		//
        		// Act
        		//
        		const props = {
        			chipOption: options,
        			label:      tc.label,
        			testid:     "incoming-chip",
        			incoming:   tc.incoming,
        			isSelected: true,
        		}
        		render(FilterChip, props)

        		//
        		// Assert
        		//
        		const chip = screen.getByTestId("incoming-chip")
        		const incomingProp = chip.querySelector(".button-label")
        		expect(incomingProp?.innerHTML).toEqual(tc.expectedIncoming)
        		tc.expectedClasses?.forEach( cssClass => expect(Array.from(chip.classList)).toContain(cssClass) )


        	})
        }

	})
})

