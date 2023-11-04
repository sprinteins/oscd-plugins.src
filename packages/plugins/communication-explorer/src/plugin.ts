import Plugin from './plugin.svelte'
import * as pkg from "../package.json";

export default class NewPlugin extends HTMLElement {

	private plugin: Plugin
	
	connectedCallback() {
		this.attachShadow({ mode: "open" });
		this.plugin = new Plugin({
			target: this.shadowRoot,
			props: {
				doc: this._doc
			}
		});

		const fileURL = new URL(import.meta.url)
		const origin = fileURL.origin
		console.log({level:"dev", origin})
		const styleCss = fetch(`${origin}/style.css`).then( async(response) => {
			const content = await response.text()
			const style = document.createElement("style");
			style.innerHTML = content;
			this.shadowRoot.appendChild(style);
		})
		// const style = document.createElement("style");
        // style.innerHTML = globalThis.pluginStyle[pkg.name];
        // this.shadowRoot.appendChild(style);
	}

	private _doc: XMLDocument
	public set doc(newDoc: XMLDocument){
		this._doc = newDoc
		if(!this.plugin) { return }

		this.plugin.$set({doc: newDoc})
	}

}
