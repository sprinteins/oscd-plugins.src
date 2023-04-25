import { FCDA } from "./fcda"

export class DataSet {
	public readonly name: string = ""
	public readonly fcdas: FCDA[] = [] 

	constructor(ied?: Partial<DataSet>){
		const newThis: DataSet = {
			...this,
			...ied,
		}
		Object.setPrototypeOf(newThis, DataSet.prototype)
		return newThis
	}
}