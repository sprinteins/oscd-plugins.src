<script lang="ts">
    import type { IEDCommInfo } from "@oscd-plugins/core"
    import { PrintMessageServiceChip } from "../../../../../../components/print-message-service-chip"

    export let publishedServiceTypes: string[]
    export let ied: IEDCommInfo
</script>

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
