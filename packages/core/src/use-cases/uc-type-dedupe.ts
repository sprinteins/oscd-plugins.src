import { DOTypeElement, SCDQueries } from "../scd/scd-query"

/** 
 * The name is temporary, rename it if you have a better one
 * UC = Use Case
 */
export class UC_Type_Dedupe {

	constructor(
		private readonly scdQueries: SCDQueries,
	){}

	public async find_duplicate_object_types(): Promise<Hashed_DOT[][]> {
		const dots = this.scdQueries.searchDOTypes()
		
		const hashed_dots: Hashed_DOT[] = await Promise.all(
			dots.map(this.create_hashed_dot.bind(this)),
		)
		const grouped = this.group_by_hash(hashed_dots)
		const duplicates = Object.values(grouped).filter(group => group.length > 1)
		
		return duplicates
	}

	private async create_hashed_dot(dot: DOTypeElement): Promise<Hashed_DOT>{
		const hash = await this.hash(dot.element.innerHTML)
		return {
			element: dot,
			hash,
		}
	}


	private async hash(str: string): Promise<string> {
		const buffer = new TextEncoder().encode(str)
		const hash_buffer = await crypto.subtle.digest("SHA-256", buffer)
		const hash_array = Array.from(new Uint8Array(hash_buffer))
		const hashHex = hash_array.map(b => b.toString(16).padStart(2, "0")).join("")
		return hashHex
	}

	private group_by_hash(dots: Hashed_DOT[]): GroupedHashedDOT {
		const grouped: GroupedHashedDOT = {}
		for (const dot of dots) {
			if (!grouped[dot.hash]) {
				grouped[dot.hash] = []
			}
			grouped[dot.hash].push(dot)
		}
		return grouped
	}

}

type Hashed_DOT = {
	element: DOTypeElement,
	hash: string
}

type GroupedHashedDOT = {
	[hash: string]: Hashed_DOT[]
}