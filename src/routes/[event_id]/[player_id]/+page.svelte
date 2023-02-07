<!-- SPECIFIC PLAYER AT EVENT PAGE -->

<script lang="ts">
    import type {event, player} from "../../../APIMock";
    import {getPlayerFromList} from "../../utils";
    export let data: {"event": {"event": event, "players": player[]}, "player": string};
    const currentPlayer: player = getPlayerFromList(data.event.players, data.player);
</script>

<h1>{currentPlayer.pseudo}</h1>
<div class="divider">MATCHS</div>
<div class="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
    {#each data.event.players as {id, pseudo, status}}
        {#if id !== data.player}
            <div class="card rounded-xl bg-primary shadow-xl">
                <div class="card-body p-4 flex-row justify-between">
                    <h2 class="card-title">{pseudo}</h2>
                    <div class="card-actions justify-end">
                        <button class="btn btn-secondary rounded-md">Vs</button>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>

</style>