export class WaitGroup {
	private current = 0
	private resolver: () => void = () => {return}

	public add(increment = 1) {
		this.current += increment
	}

	public done(): void {
		this.add(-1)
		if (this.current < 0) { throw new Error("Negative WaitGroup counter") }
		if (this.current === 0) { this.resolver() }
	}

	public wait(): Promise<void> {
		return new Promise((resolve) => {
			if (this.current === 0) {  return resolve() }
			this.resolver = resolve
		})
	}
}