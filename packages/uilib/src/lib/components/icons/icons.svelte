<script lang="ts">
    import { openSCDIcons } from "../../icons/openscd-icons"

    export let name: keyof typeof openSCDIcons
    export let size: "small" | "normal"
    $: icon = openSCDIcons[name]
</script>

<div class="icon-size icon-size-{size}">
    {@html icon ?? ""}
</div>

<style lang="scss">
    div.icon-size-small {
        $size: 1rem;
        height: $size;
        width: $size;
        svg {
            height: $size;
            width: $size;
        }
    }

    div.icon-size-normal {
        $size: 24px;
        height: $size;
        width: $size;
        :global(svg) {
            height: $size;
            width: $size;
        }
    }

    svg {
        $size: 24px;
        height: $size;
        width: $size;
    }
</style>
