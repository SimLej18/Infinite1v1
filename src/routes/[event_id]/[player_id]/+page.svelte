<!-- SPECIFIC PLAYER AT EVENT PAGE -->

<script lang="ts">
    import type {event, player} from "../../../APIMock";
    import {resultValues, playerScore, getPlayerFromList, scoreToMedal} from "../../utils";
    export let data: {"event": {"event": event, "players": player[]}, "player": string};
    const currentPlayer: player = getPlayerFromList(data.event.players, data.player);

    function playerToColorClass(id: string): "win" | "loss" | "yettobedone" {
        if (currentPlayer.wins.includes(id))
            return "win";
        if (currentPlayer.loss.includes(id))
            return "loss";
        return "yettobedone";
    }

    function playerToScore(id: string): number {
        if (currentPlayer.wins.includes(id))
            return resultValues["wins"];
        if (currentPlayer.loss.includes(id))
            return resultValues["loss"];
        if (currentPlayer.yet_to_be_done.includes(id))
            return resultValues["yet-to-be-done"];
        return -999;
    }
</script>

<div class="flex flex-row justify-between align-center px-5">
    <div class="flex flex-col justify-around">
        <h1 class="h-min">{currentPlayer.pseudo}</h1>
    </div>
    <div class="card {scoreToMedal(data.event.players, currentPlayer)} rounded-xl stats shadow text-center">
        <div class="stat-card stat text-xs p-1 md:text-base md:p-2 xl:text-2xl xl:p-3">
            <div class="stat-title">Score actuel</div>
            <div class="stat-value">{playerScore(getPlayerFromList(data.event.players, data.player))}</div>
        </div>
    </div>
</div>
<div class="divider">MATCHS</div>
<div class="grid gap-7 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
    {#each data.event.players as {id, pseudo, status}}
        {#if id !== data.player}
            <div class="indicator w-full">
                <span class="indicator-item indicator-start badge rounded-md px-2 py-3 font-bold drop-shadow-md {playerToColorClass(id)}">{(playerToScore(id) > 0) ? "+" : ""}{playerToScore(id)}</span>
                <div class="card w-full rounded-xl bg-primary shadow-xl">
                    <div class="card-body p-4 flex-row justify-between">
                        <h2 class="card-title">{pseudo}</h2>
                        <div class="card-actions justify-end">
                            <button class="btn btn-secondary rounded-md">Vs</button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>
<div class="divider"></div>

<style>
    .stat-card {
        @apply stat;
    }
</style>