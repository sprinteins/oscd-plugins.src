

// export function xmlToObj(element: Element | ChildNode) {
// 	const obj = _xmlToObj(element)
// 	return obj
// 	// return obj.HTML.BODY
// }


// function _xmlToObj(element: Element | ChildNode) {

// 	const obj: {[key: string]: any } = {}
// 	if (isElement(element)) {
// 		if (element.attributes.length > 0) {
// 			obj["$"] = {}
// 			// for (let j = 0; j < element.attributes.length; j++) {
// 			for(const attribute of element.attributes){
// 				const attrName = attribute.name.toLowerCase()
// 				const attrValue = attribute.value
// 				obj["$"][attrName] = attrValue
// 				// console.log({
// 				// 	level:"dev", 
// 				// 	msg:"_xmlToObj", 
// 				// 	tagName: element.tagName, 
// 				// 	noOfAttr: element.attributes.length,
// 				// 	nodeName: attribute.nodeName,
// 				// 	name: attribute.name,
// 				// 	element,
// 				// })
// 			}
// 		}
// 	} else if (isTextElement(element)) { // text
// 		obj["#text"] = element.nodeValue
// 	}
	
// 	if (element.hasChildNodes()) {
// 		for (const item of element.childNodes) {
// 			const nodeName = item.nodeName.toLowerCase()
// 			const itemAsJSON = _xmlToObj(item)
// 			if (typeof (obj[nodeName]) === "undefined") {
// 				obj[nodeName] = itemAsJSON
// 			} else {
// 				if (typeof (obj[nodeName].push) === "undefined") {
// 					const old = obj[nodeName]
// 					obj[nodeName] = []
// 					obj[nodeName].push(old)
// 				}
// 				obj[nodeName].push(itemAsJSON)
// 			}
// 		}
// 	}
// 	return obj
// }


// const NodeTypes: {[key:string]: number} = {
// 	Element: 1,
// 	Text:    3,
// }


// function isElement(element: Element | ChildNode): element is Element{
// 	return element.nodeType === NodeTypes.Element
// }

// function isTextElement(element: Element | ChildNode): boolean{
// 	return element.nodeType === NodeTypes.Text
// }
