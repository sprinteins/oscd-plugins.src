import Plugin from './plugin.svelte'
import * as pkg from "../package.json";


export default class NewPlugin extends HTMLElement {
	
	public doc: XMLDocument
	
	connectedCallback() {
		this.attachShadow({ mode: "open" });
		new Plugin({
			target: this.shadowRoot,
			props: {
				doc: this.doc
			}
		});
		
		const style = document.createElement("style");
		style.innerHTML = globalThis.pluginStyle[pkg.name];
		this.shadowRoot.appendChild(style);
	}
	
}