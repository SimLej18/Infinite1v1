<script lang="ts">
    import type {event} from "../../APIMock";
    export let data: event;
</script>

<div>
    {#if data.name === undefined}
        <h1>Événement introuvable</h1>
        <p>
            L'événement que vous cherchez n'existe pas ou plus. Il a peut-être été archivé.
        </p>
    {:else }
        <h1>{data.name}</h1>

    {/if}
</div>

<style>

</style>