import { writable } from "svelte/store"
import type { IEDConnectionWithCustomValues, IEDNode } from "../../../components/diagram"
import { allMessageTypes } from "@oscd-plugins/core"

export enum PdfType {
    Documentation = 1,
    Telegram,
  }

export type PdfExport = {
	type: PdfType
}

export const defaultSelection: PdfExport = {
	type: PdfType.Documentation,
}

export const pdfExportStore = writable<PdfExport>(defaultSelection)
