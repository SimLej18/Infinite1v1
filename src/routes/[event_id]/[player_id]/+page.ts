/* -- SPECIFIC EVENT PAGE -- */

import API from "../../../APIMock";
import type {PageLoad} from "./$types";

export const load = (({ params }) => {
    return {event: API.getEvent(params.event_id), player: params.player_id};
}) satisfies PageLoad