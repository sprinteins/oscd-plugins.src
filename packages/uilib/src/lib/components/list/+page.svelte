<script lang="ts">
    import Example from "../internal/example/example.svelte"
    import List from "./list.svelte"

    let items = [
    	{ icon: "dd", primaryText: "hallo", secondaryText: "wie gehts" },
    ]
</script>

<h1>List Component</h1>

<Example name="list-item">
    <List {items} />
</Example>
