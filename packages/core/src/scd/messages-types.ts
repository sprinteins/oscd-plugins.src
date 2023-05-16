export const enum MessageType {
	GOOSE = "GOOSE",
	MMS = "MMS",
	SampledValues = "SampledValues",
}

export const allMessageTypes = [
	MessageType.GOOSE,
	MessageType.MMS,
	MessageType.SampledValues,
] as const