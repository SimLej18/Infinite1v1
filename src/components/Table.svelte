<script lang="ts">
    import type {player} from "../APIMock";
    import {playerRank, scoreToMedal} from "../routes/utils";

    export let data: player[];

    function playerScore(playerIndex): number {
        return 1 * data[playerIndex].wins.length + -1 * data[playerIndex].loss.length + -2 * data[playerIndex].yet_to_be_done.length;
    }
</script>

<div class="grid my-grid" style="--n-col: {2 + data.length + 1}">
    <div class="cell cell-head cell-pseudo col-span-2"></div>
    {#each data as {}, i}
        <div class="cell">{i+1}</div>
    {/each}
    <div class="cell cell-score">Score</div>
    {#each data as {id, pseudo, wins, loss, yet_to_be_done}, i}
        <div class="cell cell-pseudo col-span-2"><div class="flex flex-row"><span class="font-bold mr-1">{i+1}:</span><span>{pseudo}</span></div></div>
        {#each data as otherPlayer}
            {#if id === otherPlayer.id}
                <div class="cell cell-1 cell-empty"></div>
            {:else if wins.includes(otherPlayer.id)}
                <div class="cell cell-1 win">+1</div>
            {:else if loss.includes(otherPlayer.id)}
                <div class="cell cell-1 loss">-1</div>
            {:else if yet_to_be_done.includes(otherPlayer.id)}
                <div class="cell cell-1 yettobedone">-2</div>
            {/if}
        {/each}
        <div class="cell cell-1 cell-score {scoreToMedal(data, data[i])}">{playerScore(i)}</div>
    {/each}
</div>

<style>
    .my-grid {
        @apply overflow-scroll;
        grid-template-columns: repeat(var(--n-col), minmax(0, 1fr));
    }

    .cell {
        @apply card bg-secondary opacity-90 m-1 rounded-md h-12 justify-center text-center min-w-min;
    }

    .cell:hover {
        @apply opacity-100;
    }

    .cell-1 {
        @apply col-span-1;
    }

    .cell-empty {
        @apply bg-gray-700;
    }

    .cell-pseudo {
        min-width: 6rem;
        @apply mr-5 text-left pl-2 overflow-hidden;
    }

    .cell-head {
        @apply mb-5 opacity-0;
    }

    .cell-score {
        min-width: 4rem;
        @apply ml-5 font-bold text-lg;
    }
</style>