import type {event, player} from "../APIMock";

export const resultValues = {"loss": -1, "yet-to-be-done": -2, "wins": +1}


export function getPlayerFromList(players: player[], player_id: string): player {
    return players.filter(({id}) => id === player_id)[0]
}

export function playerScore(player: player): number {
    return resultValues["wins"] * player.wins.length
        + resultValues["loss"] * player.loss.length
        + resultValues["yet-to-be-done"] * player.yet_to_be_done.length;
}

export function playerRank(players: player[], player_id: string): number {
    let countUp = 1;
    const score = playerScore(getPlayerFromList(players, player_id))
    for (const [, player] of players.entries()) {
        if (playerScore(player) > score)
            countUp++;
    }
    return countUp
}

export function scoreToMedal(players: player[], player: player): "cell-no-podium" | "cell-gold" | "cell-silver" | "cell-copper" {
    const rank = playerRank(players, player.id);
    if (rank === 1)
        return "cell-gold";
    else if (rank === 2)
        return "cell-silver";
    else if (rank === 3)
        return "cell-copper";
    return "cell-no-podium"
}