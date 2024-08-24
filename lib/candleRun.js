import { getNextGeyserTime } from "./geyser.js";
import { getNextGrandmaAfter } from "./grandma.js";
import { getNextTurtleTimeAfter } from "./turtle.js";

/** ---------------------------------------
 * @returns the next continuous hour-long run of wax events
 ** --------------------------------------- */
export function getNextCandleRun() {
    const geyser = getNextGeyserTime();
    const grandma = getNextGrandmaAfter(geyser);
    const turtle = getNextTurtleTimeAfter(geyser);
    // TODO: make copies instead of using the same currentTime--it's getting overwritten

    return {
        geyser: geyser,
        grandma: grandma,
        turtle: turtle,
    };
}