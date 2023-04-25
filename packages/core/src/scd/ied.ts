import { DataSet } from "./dataset"
import { Input } from "./input"

export class IED {
	public readonly name:     string    = ""
	public readonly dataSets: DataSet[] = []
	public readonly inputs:   Input[]   = []

	constructor(ied?: Partial<IED>){
		const newThis: IED = {
			...this,
			...ied,
		}
		Object.setPrototypeOf(newThis, IED.prototype)
		return newThis
	}
}

