/* -- HOMEPAGE -- */

import API from "../APIMock";
import type {PageLoad} from "./$types";

export const load = (() => {
    return API.getAllEvents();
}) satisfies PageLoad