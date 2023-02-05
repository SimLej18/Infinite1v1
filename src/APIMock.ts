//TODO: every events[event_id][player_id] -> check that player_id is in fact in events[event_id].players
export interface event {
    id: string,
    name: string,
    players: string[],
    pwdHash: number
}

export interface player {
    id: string,
    pseudo: string,
    status: "available" | "asking" | "asked" | "playing" | "proposing" | "proposed",
    playing_with: undefined | string,
    wins: string[],
    loss: string[],
    yet_to_be_done: string[],
    asked: undefined | string,
    asked_by: undefined | string,
    proposed: undefined | "win" | "loss" | "postponed",
    refused_match: string[]
}

class API {
    static events: { [event_id: string]: event } = {};
    static players: { [event_id: string]: { [player_id: string]: player } } = {};
    static hash = (str: string) => {
        let hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    constructor() {
        if (this instanceof API) {
            throw Error('A static class cannot be instantiated.');
        }
    }

    static addDummyData() {
        this.events["c3d3fef1-ed32-4c97-afa8-72c9a01535e6"] = {
            id : "c3d3fef1-ed32-4c97-afa8-72c9a01535e6",
            name : "SupremeSmash",
            players : [
                "b0ffd5cc-2cd0-4f3a-802a-ed14bf037a71",
                "d0333d89-de6b-48ab-905b-a50bfa081762",
                "c9cbc956-8062-4b25-a679-ff6d84a56ce5",
                "9b55236e-1ccf-4270-86b0-a74ea55f78cb"
            ],
            pwdHash: this.hash("hello")
        }

        this.players["c3d3fef1-ed32-4c97-afa8-72c9a01535e6"] = {
            "b0ffd5cc-2cd0-4f3a-802a-ed14bf037a71" : {
                id : "b0ffd5cc-2cd0-4f3a-802a-ed14bf037a71",
                pseudo : "Creepors",
                status: "available",
                playing_with: undefined,
                wins : [],
                loss : ["d0333d89-de6b-48ab-905b-a50bfa081762", "c9cbc956-8062-4b25-a679-ff6d84a56ce5"],
                yet_to_be_done : ["9b55236e-1ccf-4270-86b0-a74ea55f78cb"],
                asked: undefined,
                asked_by: undefined,
                proposed: undefined,
                refused_match: []
            },
            "d0333d89-de6b-48ab-905b-a50bfa081762" : {
                id : "d0333d89-de6b-48ab-905b-a50bfa081762",
                pseudo : "Kouze",
                status: "available",
                playing_with: undefined,
                wins : ["b0ffd5cc-2cd0-4f3a-802a-ed14bf037a71", "9b55236e-1ccf-4270-86b0-a74ea55f78cb"],
                loss : ["c9cbc956-8062-4b25-a679-ff6d84a56ce5"],
                yet_to_be_done : [],
                asked: undefined,
                asked_by: undefined,
                proposed: undefined,
                refused_match: []
            },
            "c9cbc956-8062-4b25-a679-ff6d84a56ce5" : {
                id : "c9cbc956-8062-4b25-a679-ff6d84a56ce5",
                pseudo : "Jéromex",
                status: "available",
                playing_with: undefined,
                wins : ["b0ffd5cc-2cd0-4f3a-802a-ed14bf037a71", "d0333d89-de6b-48ab-905b-a50bfa081762"],
                loss : [],
                yet_to_be_done : ["9b55236e-1ccf-4270-86b0-a74ea55f78cb"],
                asked: undefined,
                asked_by: undefined,
                proposed: undefined,
                refused_match: []
            },
            "9b55236e-1ccf-4270-86b0-a74ea55f78cb" : {
                id : "9b55236e-1ccf-4270-86b0-a74ea55f78cb",
                pseudo : "Youpsi",
                status: "available",
                playing_with: undefined,
                wins : [],
                loss : ["d0333d89-de6b-48ab-905b-a50bfa081762"],
                yet_to_be_done : ["b0ffd5cc-2cd0-4f3a-802a-ed14bf037a71", "c9cbc956-8062-4b25-a679-ff6d84a56ce5"],
                asked: undefined,
                asked_by: undefined,
                proposed: undefined,
                refused_match: []
            }
        }
    }

    static createEvent(name: string, pwd: string) {
        console.assert(name.length > 0);

        const event_id = crypto.randomUUID();
        this.events[event_id] = {
            id : event_id,
            name : name,
            players : [],
            pwdHash : this.hash(pwd)
        }

        return event_id;
    }

    static getEvent(event_id: string): event {
        return this.events[event_id];
    }

    static addPlayerToEvent(event_id: string, player_id: string, pseudo: string) {
        this.players[event_id][player_id] = {
            id: player_id,
            pseudo: pseudo,
            status: "available",
            playing_with: undefined,
            wins: [],
            loss: [],
            yet_to_be_done: this.events[event_id].players,
            asked: undefined,
            asked_by: undefined,
            proposed: undefined,
            refused_match: []
        }
        // Done after so that player is not in its own "yet_to_be_played" list
        this.events[event_id].players.push(player_id)
    }

    static askMatch(event_id: string, asker_id: string, asked_id: string) {
        console.assert(this.players[event_id][asker_id].status == "available");
        console.assert(this.players[event_id][asked_id].status == "available");
        console.assert(!this.players[event_id][asked_id].refused_match.includes(asker_id))

        // Asker side
        this.players[event_id][asker_id].status = "asking";
        this.players[event_id][asker_id].asked = asked_id;

        // Asked side
        this.players[event_id][asked_id].status = "asked";
        this.players[event_id][asked_id].asked_by = asker_id;
    }

    static acceptMatch(event_id: string, asker_id: string, accepter_id: string) {
        console.assert(this.players[event_id][asker_id].status == "asking");
        console.assert(this.players[event_id][accepter_id].status == "asked");

        // Asker side
        this.players[event_id][asker_id].status = "playing";
        this.players[event_id][asker_id].asked = undefined;
        this.players[event_id][asker_id].playing_with = accepter_id;

        // Accepter side
        this.players[event_id][accepter_id].status = "asked";
        this.players[event_id][accepter_id].asked_by = undefined;
        this.players[event_id][accepter_id].playing_with = asker_id;
    }

    static declineMatch(event_id: string, asker_id: string, accepter_id: string) {
        console.assert(this.players[event_id][asker_id].status == "asking");
        console.assert(this.players[event_id][accepter_id].status == "asked");

        // Asker side
        this.players[event_id][asker_id].status = "available";
        this.players[event_id][asker_id].asked = undefined;

        // Accepter side
        this.players[event_id][accepter_id].status = "available";
        this.players[event_id][accepter_id].asked_by = undefined;
        this.players[event_id][accepter_id].refused_match.push(asker_id);
    }

    static proposeResult(event_id: string, proposer_id: string, opponent_id: string, proposition: "win" | "loss" | "postponed") {
        console.assert(this.players[event_id][proposer_id].playing_with === opponent_id);
        console.assert(this.players[event_id][opponent_id].playing_with === proposer_id);

        // Proposer side
        this.players[event_id][proposer_id].status = "proposing";
        this.players[event_id][proposer_id].proposed = proposition;

        // Opponent side
        this.players[event_id][opponent_id].status = "proposed"
        this.players[event_id][opponent_id].proposed = proposition == "win" ? "loss" : proposition == "loss" ? "win" : "postponed";
    }

    static acceptResult(event_id: string, proposer_id: string, accepter_id: string) {
        console.assert(this.players[event_id][proposer_id].playing_with === accepter_id);
        console.assert(this.players[event_id][accepter_id].playing_with === proposer_id);

        for (const player_id of [proposer_id, accepter_id]) {
            const opponent_id = player_id == proposer_id ? accepter_id : proposer_id;
            if (this.players[event_id][player_id].proposed == "win")
                this.players[event_id][player_id].wins.push(opponent_id);
            if (this.players[event_id][player_id].proposed == "loss")
                this.players[event_id][player_id].loss.push(opponent_id);
            if (! (this.players[event_id][player_id].proposed == "postponed"))
                this.players[event_id][player_id].yet_to_be_done.splice(this.players[event_id][player_id].yet_to_be_done.indexOf(opponent_id), 1);
            this.players[event_id][player_id].status = "available";
            this.players[event_id][player_id].playing_with = undefined;
            this.players[event_id][player_id].refused_match = [];
        }
    }

    static rejectResult(event_id: string, proposer_id: string, rejecter_id: string) {
        console.assert(this.players[event_id][proposer_id].playing_with === rejecter_id);
        console.assert(this.players[event_id][rejecter_id].playing_with === proposer_id);

        // Proposer side
        this.players[event_id][proposer_id].status = "playing";
        this.players[event_id][proposer_id].proposed = undefined;

        // Rejecter side
        this.players[event_id][rejecter_id].status = "playing"
        this.players[event_id][rejecter_id].proposed = undefined;
    }
}

API.addDummyData()

export default API