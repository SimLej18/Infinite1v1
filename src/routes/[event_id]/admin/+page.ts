/* -- EVENT ADMIN PAGE -- */

import API from "../../../APIMock";
import type {event, player} from "../../../APIMock";
import type {PageLoad} from "./$types";

export const load = (({ params }): {"event": event, "players": player[]} => {
    return API.getEvent(params.event_id);
}) satisfies PageLoad