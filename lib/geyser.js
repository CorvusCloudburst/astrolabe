import { getNextEventHour, isEventHour } from "./globals.js";

/** ---------------------------------------
 * @returns the datetime of the next geyser
 ** --------------------------------------- */
export function getNextGeyserTime() {
    const currentTime = new Date();
    return getNextEventHour(currentTime);
};

/** ---------------------------------------
 * @returns true if the geyser is currently active
 ** --------------------------------------- */
export function isGeyserActive() {
    const currentTime = new Date();
    return isEventHour(currentTime) && currentTime.getUTCMinutes() < 15;
}