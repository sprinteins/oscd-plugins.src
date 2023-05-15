import { DATypeElement, DOTypeElement, EnumTypeElement, LNodeTypeElement, SCDElement, TypeElement } from "../scd/scd-query"
import { SCDQueries } from "../scd/scd-query"
import { hashElement } from "../xml/hash"

/** 
 * The name is temporary, rename it if you have a better one
 * UC = Use Case
 */
export class UCTypeDedupe {

	constructor(
		private readonly scdQueries: SCDQueries,
	){}

	public async findDuplicateObjectTypes(): Promise<HashedTypeElement<DOTypeElement>[][]> {
		const duplicates = await this.findDuplicateTypes(this.scdQueries.searchDOTypes.bind(this.scdQueries))
		return duplicates
	}

	public async findDuplicateDataAttributeTypes(): Promise<HashedTypeElement<DATypeElement>[][]>{
		const duplicates = await this.findDuplicateTypes(this.scdQueries.searchDATypes.bind(this.scdQueries))
		return duplicates
	}

	public async findDuplicateLogicalNodeTypes(): Promise<HashedTypeElement<LNodeTypeElement>[][]>{
		const duplicates = await this.findDuplicateTypes(this.scdQueries.searchLNodeTypes.bind(this.scdQueries))
		return duplicates
	}

	public async findDuplicateEnumTypes(): Promise<HashedTypeElement<EnumTypeElement>[][]>{
		const duplicates = await this.findDuplicateTypes(this.scdQueries.searchEnumTypes.bind(this.scdQueries))
		return duplicates
	}
	
	public async findDuplicateTypes<T extends TypeElement>(searchFunction: () => T[]): Promise<HashedTypeElement<T>[][]>{
		const types = await searchFunction()
		const hashedTypes: HashedTypeElement<T>[] = await Promise.all(
			types.map(this.createHashedElement.bind(this)),
		)
		const grouped = this.groupByHash(hashedTypes)
		const duplicates = Object.values(grouped).filter(group => group.length > 1)

		return duplicates
	}


	private findUserElements(dotId: string): SCDElement[] {
		const elements = this.scdQueries.searchElementsByTypeAttr(dotId)
		return elements
	}

	private async createHashedElement<T extends TypeElement>(el: T): Promise<HashedTypeElement<T>>{
		const hash = await hashElement(el.element)
		const usages = this.findUserElements(el.id)
		return {
			element: el,
			hash,
			usages,
		}
	}

	private groupByHash<T extends TypeElement>(dots: HashedTypeElement<T>[]): GroupedElements<T> {
		const grouped: GroupedElements<T> = {}
		for (const dot of dots) {
			if (!grouped[dot.hash]) {
				grouped[dot.hash] = []
			}
			grouped[dot.hash].push(dot)
		}
		return grouped
	}

	
}

export type HashedTypeElement<T extends TypeElement> = {
	element: T,
	hash: string,
	usages: SCDElement[],
}

export type HashedDOT = HashedTypeElement<DOTypeElement>
export type HashedDAT = HashedTypeElement<DATypeElement>

type GroupedElements<T extends TypeElement> = {
	[hash: string]: HashedTypeElement<T>[]
}