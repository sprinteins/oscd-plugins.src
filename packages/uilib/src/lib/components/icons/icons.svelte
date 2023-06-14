<script lang="ts">
    import { openSCDIcons } from "./"

    type openSCDIconNames = keyof typeof openSCDIcons;
    type iconSizes = "small" | "normal" | "rect";

    export let name: openSCDIconNames
    export let size: iconSizes

    $: icon = openSCDIcons[name] ?? ""
</script>

<div class="icon-size icon-size-{size}">
    {@html icon}
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
            height: 26.5px;
            width: 24px;
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
    
    div.icon-size-rect {
        $size: 24px;
        height: $size;
        width: $size;
        :global(svg) {
            height: 26.5px;
            width: 24px;
        }
    }

    svg {
        $size: 24px;
        height: $size;
        width: $size;
    }
</style>
