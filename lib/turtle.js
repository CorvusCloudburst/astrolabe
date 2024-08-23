import { getNextEventHour, isEventHour } from "./globals.js";

const startTime = 50;
const endTime = startTime + 10;

/** ---------------------------------------
 * @returns the datetime of the next turtle
 ** --------------------------------------- */
export function getNextTurtleTime() {
    const currentTime = new Date();
    if (isEventHour(currentTime) && currentTime.getMinutes() < startTime) {
        currentTime.setMinutes(startTime);
        return currentTime;
    }
    const nextEventHour = getNextEventHour(currentTime);
    nextEventHour.setMinutes(startTime);
    return nextEventHour;
};

/** ---------------------------------------
 * @returns true if sunset is currently happening
 ** --------------------------------------- */
export function isTurtleActive() {
    const currentTime = new Date();
    const currentMinute = currentTime.getUTCMinutes();
    return isEventHour(currentTime) && currentMinute >= startTime;
}

/** ---------------------------------------
 * @returns the remaining minutes left of sunset
 ** --------------------------------------- */
export function getRemainingTurtleMinutes() {
    const currentTime = new Date();
    return isTurtleActive() ? endTime - currentTime.getUTCMinutes() : 0;
}