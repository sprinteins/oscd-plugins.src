<script lang="ts">
    import { openSCDIcons } from "../../icons/openscd-icons"

    export let name: keyof typeof openSCDIcons
    export let size: string
    $: icon = openSCDIcons[name]

    const variantSize: { [key in typeof size]: string } = {
    	small:  "small",
    	normal: "normal",
    }
</script>

<div class="icon-size icon-size-{variantSize[size]}">
    <svg viewBox="0 0 24 24">
        {@html icon}
    </svg>
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
        svg {
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
