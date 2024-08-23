import { getNextEventHour, isEventHour } from "./globals.js";

/** ---------------------------------------
 * @returns the datetime of the next turtle
 ** --------------------------------------- */
export function getNextTurtleTime() {
    const currentTime = new Date();
    const nextEventHour = getNextEventHour(currentTime);
    nextEventHour.setMinutes(50);
    return nextEventHour;
};

/** ---------------------------------------
 * @returns true if sunset is currently happening
 ** --------------------------------------- */
export function isTurtleActive() {
    const currentTime = new Date();
    const currentMinute = currentTime.getUTCMinutes();
    return isEventHour(currentTime) && currentMinute >= 50;
}

/** ---------------------------------------
 * @returns the remaining minutes left of sunset
 ** --------------------------------------- */
export function getRemainingTurtleMinutes() {
    const currentTime = new Date();
    return isTurtleActive() ? 50 - currentTime.getUTCMinutes() : 0;
}