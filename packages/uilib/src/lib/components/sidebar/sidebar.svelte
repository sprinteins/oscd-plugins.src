<script lang="ts">
    import { ConnectionType } from ".";
    import GooseConnections from "../goose-connection/goose-connections.svelte";
    import ConnectionSelector from "./assets/connection-selector.svg";

</script>

<div class="sidebar sidebar-right">
    <div class="sidebar-content">


        
        <div class="ied-nodes">
            <img src={ConnectionSelector} alt="connection selector">
            <label>
                <span>Show Connections</span>
                <select>
                    <option disabled selected>Select a Node</option>
                    <option>IED1.1</option>
                </select>
            </label>
        </div>

        <hr>
    
        <div class="connection-type">
            <label>
                <input type="checkbox" checked>
                <span>Incoming</span>
            </label>
            <label>
                <input type="checkbox" checked>
                <span>Outcoming</span>
            </label>
        </div>

        <hr>

        <div class="goos-messages">
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Incoming} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Outgoing} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Incoming} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Outgoing} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Incoming} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Outgoing} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Incoming} />
            <GooseConnections header={"Label of GOOSE"} description={"?Disc_QB1 / XSWI 1?"} connectiontype={ConnectionType.Outgoing} />
        </div>

    </div>
</div>

<style lang="scss">
    hr {
        margin: 2rem 0;
    }
    .sidebar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        &.sidebar-right {
            right: 0 !important;
            left: inherit !important;
        }
        .sidebar-content {
            padding: 1rem;
            background-color: #ede8d7;
            height: 100%;
            overflow-y: scroll;
        }
    }

    .ied-nodes {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
            height: 1.3rem;
            width: 1.3rem;
        }
        
        label {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .connection-type {
        display: flex;
        flex-direction: column;
        user-select: none;
    }

    .goos-messages {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: .5rem
    }
</style>