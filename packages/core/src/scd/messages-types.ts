export const enum MessageType {
	GOOSe = "GOOSe",
	MMS = "MMS",
	SampledValues = "SampledValues",
}

export const allMessageTypes = [
	MessageType.GOOSe,
	MessageType.MMS,
	MessageType.SampledValues,
] as const