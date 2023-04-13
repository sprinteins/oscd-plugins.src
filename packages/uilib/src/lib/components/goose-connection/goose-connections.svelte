<script lang="ts">
    import { ConnectionType } from "../sidebar";


    export let header: string = "Label of GOOSE";
    export let description: string = "???";

    export let connectiontype: ConnectionType;

    let connectionTypeClass: string;
    $: connectionTypeClass = function(connectiontype: ConnectionType) {
        switch (connectiontype) {
            case ConnectionType.Incoming:
                return "incoming"
            case ConnectionType.Outgoing:
                return "outgoing"
            default:
                return "unknown"
        }
    }(connectiontype)
</script>

<div class="connection connection-{connectionTypeClass}">
    <span class="header"> { header } </span>
    <span class="description"> { description } </span>
</div>

<style lang="scss">
    .connection {
        background-color: white;
        border: 2px solid;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        padding: .3rem .6rem;
        min-width: 170px;
        user-select: none;

        &.connection-incoming{
            border-color: #65b0d7;
        }
        &.connection-outgoing{
            border-color: #f0b965;
        }
        &.connection-unknown{
            border-color: #ff0000;
        }

        .header {
            font-size: 1.1em;
        }
        .description {
            font-size: .9em;
            color: rgba(0, 0, 0, 0.37);
        }
    }
</style>