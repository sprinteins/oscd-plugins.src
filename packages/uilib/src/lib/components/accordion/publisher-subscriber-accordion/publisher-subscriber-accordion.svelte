<script lang="ts">
    import type { IEDNode } from "../../diagram"
    import IconArrowDropDown from "../../icons/icon-arrow-drop-down.svelte"
    import Icons from "../../icons/icons.svelte"

    export let open = false
    export let label: string
    export let affectedIEDs: IEDNode[] = []
    export let color: string
</script>

<div class="accordion">
    <details bind:open>
        <summary style="border-color: var({color})" class="summary">
            <div class="infoblock-headline">
                {#if label === "GOOSE"}
                    <Icons size={"normal"} name={"tscdGooseIcon"} />
                {:else if label === "Sampled Values"}
                    <Icons size={"normal"} name={"tscdSvIcon"} />
                {:else if label === "MMS"}
                    <Icons size={"normal"} name={"tscdMmsIcon"} />
                {:else if label === "Unknown"}
                    <!-- here will be the unknown icon instead of error. It is a placeholder for the moment -->
                    <Icons size={"normal"} name={"error"} />
                {/if}
                <span class="label">{label}</span>
                <div class="icon">
                    <IconArrowDropDown />
                </div>
            </div>
        </summary>
        <div class="accordion-open">
            <hr class="dashed-line" />
            <div class="infomation-block">
                <div>ID:</div>
                <div>MessageType: {label}</div>
            </div>

            <hr class="seperation-line" />
            {#if affectedIEDs.length > 0}
                <ul>
                    Subscribers
                    {#each affectedIEDs as ied}
                        <li>
                            <div class="ied-component">
                                {ied.label}
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p>No items found</p>
            {/if}
        </div>
    </details>
</div>

<style lang="scss">
    div.accordion {
        .summary {
            padding-left: 0.5rem;
            padding-right: 1rem;
        }
        .infoblock-headline {
            display: contents;
            .label {
                margin-right: 20rem;
            }
        }

        border: 2px solid var(--color-accent);
        border-radius: 5px;
        details[open] > summary > div.icon {
            transform: rotate(-180deg);
        }
        details {
            background-color: #ede8d7;
            border-radius: 5px;
            accent-color: #ff6600;
            cursor: pointer;

            summary {
                background-color: #ede8d7;
                padding: 0.4rem 0.5rem 0.4rem 1.5rem;
                list-style-type: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 0.5rem;

                div.icon {
                    :global(svg) {
                        display: block;
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                    :global(svg path) {
                        fill: #2aa198;
                    }
                }
            }
            div.accordion-open {
                padding-bottom: 0.2rem;
                // border: 2px solid var(--color-black);
                // border-top: none;
                // border-radius: 5px;
                summary {
                    border: none;
                }
                p {
                    padding: 0 2rem;
                }
                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    list-style-type: none;
                    padding: 0 1rem;
                    margin: 0.5rem 0;
                    li {
                        div.ied-component {
                            /* TODO: extract colors */
                            background-color: #fdfbf2;
                            border: 1px solid #4d5d63;
                            border-radius: 5px;
                            padding: 0.4rem 1.2rem;
                        }
                    }
                }
            }
        }
        .seperation-line {
            border: none;
            border-top: 0.1rem solid var(--color-accent);
            max-width: 95%;
        }
        .dashed-line {
            border: none;
            border-top: 0.1rem dashed var(--color-accent);
            max-width: 95%;
        }
        .infomation-block {
            display: flex;
            flex-direction: column;
            margin-left: 1rem;
        }
    }
</style>
