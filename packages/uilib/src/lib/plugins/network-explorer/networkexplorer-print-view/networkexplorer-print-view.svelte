<script lang="ts">
    import type {
    	IEDCommInfo,
    	InputExtRefElement,
    	ReceivedMessage,
    } from "@oscd-plugins/core"
    import { getIEDs } from "../../communication-explorer/get-ieds"
    import TelemetryView from "../../communication-explorer/telemetry-view.svelte"

    export let scdData: Element
    let iedInfos: IEDCommInfo[] = calcIEDs(scdData)

    function calcIEDs(root: Element): IEDCommInfo[] {
    	if (!root) {
    		console.info({ level: "info", msg: "initInfos: no root" })
    		return []
    	}

    	return getIEDs(root)
    }

    function calcPublished(iedName: string): ReceivedMessage[] {
    	let published: Array<{
            iedName: string;
            serviceType: string;
            srcCBName: string;
            data: InputExtRefElement[];
        }> = []

    	iedInfos.forEach((checkIed) => {
    		checkIed.received.forEach((received) => {
    			if (received.iedName === iedName) {
    				published.push(received)
    			}
    			received.iedName
    		})
    	})

    	return published
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
                        {@const newPublished = calcPublished(ied.iedName)}
                        <li>
                            <h4>{ied.iedName}</h4>
                            {#if newPublished.length > 0}
                                <div>
                                    <h5>Publisher</h5>
                                    <ul>
                                        {#each newPublished as publisher}
                                            <li>
                                                {publisher.serviceType} - {publisher.iedName}
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/if}
                            {#if ied.received.length > 0}
                                <div>
                                    <h5>Subscriber</h5>
                                    <ul>
                                        {#each ied.received as subscriber}
                                            <li>
                                                {subscriber.serviceType} - {subscriber.iedName}
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
</style>
