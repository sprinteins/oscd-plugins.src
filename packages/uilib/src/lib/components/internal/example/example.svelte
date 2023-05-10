<script>
    import Theme from "../../../style/theme.svelte"
    export let name=""
    
</script>

<Theme />
<example>
    <div>
        <h3>{name}</h3>
    </div>

    <slot></slot>
</example>

<style>
    example{
        display: block;
        margin-bottom: 3rem;
        position: relative;
        width: 100%;
    }
    h3{
        margin-bottom: 1rem;
    }
</style>