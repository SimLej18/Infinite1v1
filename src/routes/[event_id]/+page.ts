import API from "../../APIMock";
import type {PageLoad} from "./$types";

export const load = (({ params }) => {
    return API.getEvent(params.event_id);
}) satisfies PageLoad