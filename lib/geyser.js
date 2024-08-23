import { getNextEventHour, isEventHour } from "./globals.js";

const startTime = 5;
const endTime = startTime + 10;

/** ---------------------------------------
 * @returns the datetime of the next geyser
 ** --------------------------------------- */
export function getNextGeyserTime() {
    const currentTime = new Date();
    const nextEventHour = getNextEventHour(currentTime);
    nextEventHour.setMinutes(startTime);
    return nextEventHour;
};

/** ---------------------------------------
 * @returns true if the geyser is currently active
 ** --------------------------------------- */
export function isGeyserActive() {
    const currentTime = new Date();
    return isEventHour(currentTime) && currentTime.getUTCMinutes() < endTime;
}

/** ---------------------------------------
 * @returns the remaining minutes in the currently active geyser event
 ** --------------------------------------- */
export function getRemainingGeyserMinutes() {
    const currentTime = new Date();
    return isGeyserActive() ? endTime - currentTime.getMinutes() : 0;
}