<!-- EVENT ADMIN PAGE -->

<script lang="ts">
    import type {event, player} from "../../../APIMock";
    import {getPlayerFromList} from "../../utils";
    export let data: {"event": event, "players": player[]};
</script>

<h1>{data.event.name}</h1>
<div class="divider">Joueurs</div>
<div class="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
    {#each data.players as {id, pseudo}}
        <a href="/{data.event.id}/{id}">
            <div class="card bg-primary p-2">
                <div class="card-title">
                    {pseudo}
                </div>
            </div>
        </a>
    {/each}
</div>
<div class="divider"></div>

<style>

</style>