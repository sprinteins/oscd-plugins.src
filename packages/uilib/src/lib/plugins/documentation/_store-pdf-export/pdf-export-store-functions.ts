import { pdfExportStore, type PdfExport, type PdfType } from "./pdf-export-store"

export function setPdfConfigurationType(selectedType : PdfType) {
    
	pdfExportStore.update((values: PdfExport) => {
		return {
			...values,
			type: selectedType,
		}
	})
}