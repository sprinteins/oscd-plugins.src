<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import PrintIeds from "./print-ieds/print-ieds.svelte"

    export let iedInfos: IEDCommInfo[]

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

<div class="bay-list">
    <h2>List with all Bays</h2>
    <ul>
        <li>
            <h3>Only Bay</h3>
            <ul>
                {#each iedInfos as ied}
                    {@const publishedServiceTypes = calcPublished(ied.iedName)}
                    <li>
                        <PrintIeds {ied} {publishedServiceTypes} />
                    </li>
                {/each}
            </ul>
        </li>
    </ul>
</div>

<style lang="scss">
    :global(li) {
        font-size: 1rem;
    }
</style>
