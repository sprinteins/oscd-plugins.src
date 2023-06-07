<script lang="ts">
    import type { MessageType } from "@oscd-plugins/core"
    import type { IEDNode } from "../../diagram"
    import IconArrowDropDown from "../../icons/icon-arrow-drop-down.svelte"

    export let open = false
    export let label: string
    export let affectedIEDs: IEDNode[] = []
    export let color: string
</script>

<div class="accordion">
    <details bind:open>
        <summary style="border-color: var({color})">
            <span>{label}</span>
            <div class="icon">
                <IconArrowDropDown />
            </div>
        </summary>
        <div class="accordion-open">
            {#if affectedIEDs.length > 0}
                <ul>
                    {#each affectedIEDs as ied}
                        <li>
                            <div
                                class="ied-component"
                                style="border-color: var({color})"
                            >
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
        details[open] > summary > div.icon {
            transform: rotate(-180deg);
        }
        details {
            background-color: #ede8d7;
            border-radius: 5px;
            accent-color: #ff6600;
            cursor: pointer;
            summary {
                border-radius: 5px;
                background-color: #ede8d7;
                border: 2px solid var(--color-black);
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
                p {
                    padding: 0 2rem;
                }
                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    list-style-type: none;
                    padding: 0 1rem;
                    li {
                        div.ied-component {
                            background-color: #fdfbf2;
                            border: 1px solid #4d5d63;
                            border-radius: 5px;
                            padding: 0.4rem 1.2rem;
                        }
                    }
                }
            }
        }
    }
</style>
