<script lang="ts">
    import type { MessageType } from "@oscd-plugins/core"
    import PublisherSubscriberAccordion from "../../../../components/accordion/publisher-subscriber-accordion/publisher-subscriber-accordion.svelte"
    import type { IEDNode, RootNode } from "../../../../components/diagram"
    import { IED } from "../../../../components/ied"
    import {
    	getConnectedIEDsByLabel,
    } from "../../_func-layout-calculation/get-connected-ieds"
    import { groupRelationsByServiceType, type ServiceTypeGroup } from "."

    export let rootNode: RootNode
    export let IEDSelection: IEDNode

    let relationsByServiceType: ServiceTypeGroup = new Map()
    $: relations = getConnectedIEDsByLabel(rootNode, IEDSelection.label)
    $: relationsByServiceType = groupRelationsByServiceType(
    	relations.subscribedFrom
    )
    $: serviceTypes = Array.from(relationsByServiceType.entries())

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
    {#each serviceTypes as serviceType}
        {@const service = serviceType[1]}
        {@const type = service[0].serviceType}
        {@const typeLabel = service[0].serviceTypeLabel}
        
        <div class="accordion">
            <PublisherSubscriberAccordion
                color={serviceTypeColor[type]}
                serviceType={type}
                serviceLabel={typeLabel}
                affectedIEDObjects={service}
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
