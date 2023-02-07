<!-- HOMEPAGE -->

<script lang="ts">
    import type {event} from "../APIMock";
    export let data: { [event_id: string]: event };
</script>

<div>
    <h1>Événements en cours :</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
        {#each Object.entries(data) as [event_id, event_data]}
            <a href={"/"+event_id}>
                <div class="card bg-primary p-3">
                    <h1 class="card-title">{event_data.name}</h1>
                    <p>{event_data.players.length} participants</p>
                </div>
            </a>
        {/each}
    </div>
</div>

<style>

</style>