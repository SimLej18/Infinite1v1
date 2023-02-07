<!-- SPECIFIC EVENT PAGE -->

<script lang="ts">
    import type {event, player} from "../../APIMock";
    import Table from "../../components/Table.svelte";
    export let data: {"event": event, "players": player[]};
</script>

<div>
    {#if data.event.name === undefined}
        <h1>Événement introuvable</h1>
        <p>
            L'événement que vous cherchez n'existe pas ou plus. Il a peut-être été archivé.
        </p>
    {:else }
        <h1>{data.event.name}</h1>
        {#if data.players.length === 0}
            <h2 class="mt-10">Pas encore de joueur...</h2>
        {:else}
            <div class="divider">POOL</div>
            <Table data={data.players}/>
            <div class="divider"></div>
        {/if}
    {/if}
</div>

<style>

</style>