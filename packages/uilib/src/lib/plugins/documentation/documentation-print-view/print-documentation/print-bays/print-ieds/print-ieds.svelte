<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import { PrintMessageServiceChip } from "../../../../../../components/print-message-service-chip"
    import { convertIEDNameToID } from "../../_shared-functions"

    export let publishedServiceTypes: string[] | undefined = undefined
    export let ied: IEDCommInfo

    const gotoIedNameID = convertIEDNameToID(ied.iedName, false)
</script>

<div class="ied-node" id={gotoIedNameID}>
    <h4>
        {ied.iedName}
    </h4>
    {#if publishedServiceTypes != undefined && publishedServiceTypes.length > 0}
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
                        <a href={convertIEDNameToID(subscriber.iedName, true)}>
                            <span>
                                {subscriber.iedName}
                            </span>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style lang="scss">
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

    .show-publiished-service-types {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
        list-style-type: none;
    }
</style>
