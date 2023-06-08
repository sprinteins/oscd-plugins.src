<script lang="ts">
    import { openSCDIcons } from "./"

    type OpenSCDIconNames = keyof typeof openSCDIcons;
    type IconSizes = "small" | "normal";

    export let name: OpenSCDIconNames
    export let size: IconSizes

    $: icon = openSCDIcons[name] ?? ""
</script>

<div 
    class="icon-size icon-size-{size}"
    class:icon-size-small={size === "small"}
    class:icon-size-normal={size === "normal"}
>
    {@html icon}
</div>

<style lang="scss">
    .icon-size-small {
        $size: 1rem;
        height: $size;
        width: $size;
        /* TODO: remove if not needed */
        /* svg {
            height: $size;
            width: $size;
        } */
    }

    .icon-size-normal {
        $size: 24px;
        height: $size;
        width: $size;
        :global(svg) {
            height: $size;
            width: $size;
        }
    }

    /* TODO: remove if not needed */
    /* svg {
        $size: 24px;
        height: $size;
        width: $size;
    } */
</style>
