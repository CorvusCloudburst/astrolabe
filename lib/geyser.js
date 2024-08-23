import { getNextEventHour, isEventHour } from "./globals.js";

/** ---------------------------------------
 * @returns the datetime of the next geyser
 ** --------------------------------------- */
export function getNextGeyserTime() {
    const currentTime = new Date();
    const nextEventHour = getNextEventHour(currentTime);
    nextEventHour.setMinutes(5);
    return nextEventHour;
};

/** ---------------------------------------
 * @returns true if the geyser is currently active
 ** --------------------------------------- */
export function isGeyserActive() {
    const currentTime = new Date();
    return isEventHour(currentTime) && currentTime.getUTCMinutes() < 15;
}

/** ---------------------------------------
 * @returns the remaining minutes in the currently active geyser event
 ** --------------------------------------- */
export function getRemainingGeyserMinutes() {
    const currentTime = new Date();
    return isGeyserActive() ? 15 - currentTime.getMinutes() : 0;
}