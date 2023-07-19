<script lang="ts">
    import { Example } from "../../internal"
    import { IEDAccordion } from "."
    import type { ServiceObject } from "../../../plugins/communication-explorer/sidebar/ied-accordion"

    const exampleValues: ServiceObject[] | undefined = []
</script>

<Example name={"closed"}>
    <div class="max-width-300px">
        <IEDAccordion
            color={"--color-message-goose"}
            serviceType={"Label of GOOSE ?Disc_QB1 / XSWI 1?"}
            affectedIEDObjects={exampleValues}
        />
    </div>
</Example>

<Example name={"open"}>
    <div class="max-width-300px">
        <IEDAccordion
            color={"--color-message-goose"}
            open={true}
            serviceType={"Label of GOOSE ?Disc_QB1 / XSWI 1?"}
            affectedIEDObjects={exampleValues}
        />
    </div>
</Example>

<Example name={"empty"}>
    <div class="max-width-300px">
        <IEDAccordion
            color={"--color-message-goose"}
            open={true}
            serviceType={"Label of GOOSE ?Disc_QB1 / XSWI 1?"}
            affectedIEDObjects={[]}
        />
    </div>
</Example>

<style lang="scss">
    div.max-width-300px {
        max-width: 300px;
    }
</style>
