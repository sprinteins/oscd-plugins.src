import { render, screen, fireEvent, act } from "@testing-library/svelte"
import {describe, it, expect } from "vitest"
import { Diagram } from "."
import type { IEDConnection } from "./nodes"
import type { Config } from "../../plugins/communication-explorer/_func-layout-calculation/config"
import type { IEDCommInfo } from "@oscd-plugins/core"
import { calculateLayout } from "../../plugins/communication-explorer/_func-layout-calculation"
import { clearIEDSelection, selectConnection, selectIEDNode, selectedIEDNode, toggleMultiSelectionOfIED } from "../../plugins/communication-explorer/_store-view-filter"
import { get } from "svelte/store"


describe("Diagram", () => {

	type TestCase = {
		desc: string,
		
	}

	const tests: TestCase[] = [
		{
			desc: "has selected class if isSelected is true",
		},
	]

	tests.forEach(test)

	function test(tc: TestCase) {
		it(tc.desc, async () => {
	
			
			const _config: Config = {
				height:              40,
				width:               100,
				spacingBase:         10,
				spacingBetweenNodes: 100,
			}
	
			const iedInfos: IEDCommInfo[] = [
				{iedName: "IED_1-1", published: [], received: []},
				{iedName: "IED_1-2", published: [], received: []},
		
				{iedName: "IED_2-1", published: [], received: []},
				{iedName: "IED_2-2", published: [], received: []},

				{iedName: "IED_3-1", published: [], received: []},
				{iedName: "IED_3-2", published: [], received: []},
			]

			iedInfos[0].published.push({
				id:            "1",
				name:          "name",
				targetIEDName: iedInfos[1].iedName,
				serviceType:   "MMS",
			})
			iedInfos[2].received.push({
				iedName: 	   iedInfos[3].iedName,
				serviceType: "GOOSE",
				srcCBName: 	 "Dataset_1",
				data:        [],
			})
			iedInfos[4].received.push({
				iedName: 	   iedInfos[5].iedName,
				serviceType: "SMV",
				srcCBName: 	 "Dataset_1",
				data:        [],
			})

			const rootNode = await calculateLayout(iedInfos, _config, get(selectedIEDNode))
			
			render(Diagram, { rootNode })
			// expect(screen).
			
		})
	}

})
