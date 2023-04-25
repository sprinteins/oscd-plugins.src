export class FCDA{

	public readonly ldInst:  string = ""
	public readonly prefix:  string = ""
	public readonly lnClass: string = ""
	public readonly lnInst:  string = ""
	public readonly doName:  string = ""
	public readonly daName:  string = ""
	public readonly fc:		 string = ""


	constructor(fcda?: Partial<FCDA>){
		const newThis: FCDA = {
			...this,
			...fcda,
		}
		Object.setPrototypeOf(newThis, FCDA.prototype)
		return newThis
	}
}