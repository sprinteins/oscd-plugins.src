<script lang="ts">
    import type { MessageType } from "@oscd-plugins/core"
    import PublisherSubscriberAccordion from "../../../../components/accordion/publisher-subscriber-accordion/publisher-subscriber-accordion.svelte"
    import type { IEDNode, RootNode } from "../../../../components/diagram"
    import { IED } from "../../../../components/ied"
    import {
    	getConnectedIEDsByLabel,
    	type ConnectedIED,
    } from "../../_func-layout-calculation/get-connected-ieds"

    export let rootNode: RootNode
    export let IEDSelection: IEDNode

    type ServiceTypeSort = Map<MessageType | "Unknown" | undefined, IEDNode[]>;

    let relationsByServiceType: ServiceTypeSort = new Map()
    $: relations = getConnectedIEDsByLabel(rootNode, IEDSelection.label)
    $: relationsByServiceType = sortRelationsByServiceType(
    	relations.subscribedFrom
    )

    function sortRelationsByServiceType(
    	relations: ConnectedIED[]
    ): ServiceTypeSort {
    	let array: ServiceTypeSort = new Map()

    	relations.forEach((element) => {
    		let serviceType: MessageType | "Unknown" | undefined =
                element.serviceType
    		if (serviceType === undefined) serviceType = "Unknown"

    		let hasServiceTypeElement = array.has(element.serviceType)
    		if (!hasServiceTypeElement) {
    			array.set(serviceType, [])
    		}
    		let serviceTypeElement = array.get(serviceType)
    		serviceTypeElement?.push(element.node)
    	})
    	return array
    }

    const serviceTypeColor: { [key in MessageType | "Unknown"]: string } = {
    	GOOSE:         "--color-message-goose",
    	MMS:           "--color-message-mms",
    	SampledValues: "--color-message-sampledvalues",
    	Unknown:       "--color-message-unknown",
    }
</script>

<div class="ied">
    <IED label={IEDSelection.label} isSelected={true} isSelectable={false} />
</div>
<div class="accordions">
    {#each Array.from(relationsByServiceType.entries()) as serviceType}
        <div class="accordion">
            <PublisherSubscriberAccordion
                color={serviceTypeColor[serviceType[0] ?? "Unknown"]}
                label={serviceType[0] ?? "Unknown"}
                affectedIEDs={serviceType[1] ?? []}
            />
        </div>
    {/each}
</div>

<style lang="scss">
    .ied {
        margin-bottom: 1rem;
    }
    .accordions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-left: 1rem;
    }
</style>
