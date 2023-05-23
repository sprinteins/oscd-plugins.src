<script lang="ts">
    import type {
    	IEDCommInfo,
    	InputExtRefElement,
    	ReceivedMessage,
    } from "@oscd-plugins/core"
    import { getIEDs } from "../../communication-explorer/"
    import TelemetryView from "../../communication-explorer/telemetry-view.svelte"
    import { PrintMessageServiceChip } from "../../../components/print-message-service-chip"

    export let scdData: Element
    let iedInfos: IEDCommInfo[] = calcIEDs(scdData)

    function calcIEDs(root: Element): IEDCommInfo[] {
    	if (!root) {
    		console.info({ level: "info", msg: "initInfos: no root" })
    		return []
    	}

    	return getIEDs(root)
    }

    function calcPublished(iedName: string): string[] {
    	let publishedServiceTypes: string[] = []

    	for (const checkIed of iedInfos) {
    		for (const received of checkIed.received) {
    			if (received.iedName === iedName) {
    				publishedServiceTypes.push(received.serviceType)
    			}
    		}
    	}

    	// make entries unique before returning them
    	return [...new Set(publishedServiceTypes)]
    }
</script>

<section class="network-explorer-print-content">
    <h1>Network Explorer</h1>
    <div class="telemetry-viewer">
        <TelemetryView bind:root={scdData} showSidebar={false} />
    </div>

    <div class="pagebreak" />

    <div class="bay-list">
        <h2>List with all Bays</h2>
        <ul>
            <li>
                <h3>Only Bay</h3>
                <ul>
                    {#each iedInfos as ied}
                        {@const publishedServiceTypes = calcPublished(
                            ied.iedName
                        )}
                        <li>
                            <h4>{ied.iedName}</h4>
                            {#if publishedServiceTypes.length > 0}
                                <div>
                                    <h5>Publisher</h5>
                                    <ul class="show-publiished-service-types">
                                        {#each publishedServiceTypes as serviceType}
                                            <li>
                                                <PrintMessageServiceChip
                                                    type={serviceType.toLocaleLowerCase()}
                                                />
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/if}
                            {#if ied.received.length > 0}
                                <div>
                                    <h5>Subscriber</h5>
                                    <ul class="subscriber-list">
                                        {#each ied.received as subscriber}
                                            <li>
                                                <div class="chip">
                                                    <PrintMessageServiceChip
                                                        type={subscriber.serviceType.toLocaleLowerCase()}
                                                    />
                                                </div>
                                                <span>
                                                    {subscriber.iedName}
                                                </span>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </li>
        </ul>
    </div>
</section>

<style lang="scss">
    @media not print {
        .network-explorer-print-content {
            display: none;
        }
    }
    .pagebreak {
        clear: both;
        page-break-before: always;
        height: 1px;
    }

    .show-publiished-service-types {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        list-style-type: none;
    }

    li {
        font-size: 1rem;
    }

    ul.subscriber-list {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        li {
            display: flex;
            flex-direction: row;
            gap: 0.3rem;
        }
    }
</style>
