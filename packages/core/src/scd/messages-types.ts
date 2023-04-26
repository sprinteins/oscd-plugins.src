export const enum MessageType {
	GOOSe = "GOOSe",
	MMS = "MMS",
	SampledValues = "SampledValues",
}

export const messageTypeXMLMap:{[key: string]: MessageType} = {
	"GOOSE": MessageType.GOOSe,
	"SMV":   MessageType.SampledValues,
}

export const allMessageTypes = [
	MessageType.GOOSe,
	MessageType.MMS,
	MessageType.SampledValues,
] as const