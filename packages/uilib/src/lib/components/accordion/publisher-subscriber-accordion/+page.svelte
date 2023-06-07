<script lang="ts">
    import { Example } from "../../internal"
    import { IEDAccordion } from "."
    import type { IEDNode } from "../../diagram"

    const exampleValues: IEDNode[] | undefined = []
</script>

<Example name={"closed"}>
    <div class="max-width-300px">
        <IEDAccordion
            color={"--color-message-goose"}
            label={"Label of GOOSE ?Disc_QB1 / XSWI 1?"}
            affectedIEDs={exampleValues}
        />
    </div>
</Example>

<Example name={"open"}>
    <div class="max-width-300px">
        <IEDAccordion
            color={"--color-message-goose"}
            open={true}
            label={"Label of GOOSE ?Disc_QB1 / XSWI 1?"}
            affectedIEDs={exampleValues}
        />
    </div>
</Example>

<Example name={"empty"}>
    <div class="max-width-300px">
        <IEDAccordion
            color={"--color-message-goose"}
            open={true}
            label={"Label of GOOSE ?Disc_QB1 / XSWI 1?"}
            affectedIEDs={[]}
        />
    </div>
</Example>

<style lang="scss">
    div.max-width-300px {
        max-width: 300px;
    }
</style>
