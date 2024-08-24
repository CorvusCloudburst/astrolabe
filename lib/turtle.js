import { getNextEventHour, isEventHour } from "./globals.js";

const startTime = 50;
const endTime = startTime + 10;

/** ---------------------------------------
 * @returns the datetime of the next turtle
 ** --------------------------------------- */
export function getNextTurtleTime() {
    const currentTime = new Date();
    return getNextTurtleTimeAfter(currentTime);
};

/** ---------------------------------------
 * @returns the datetime of the next turtle after the provided datetime
 ** --------------------------------------- */
export function getNextTurtleTimeAfter(inputTime) {
    const dateTime = new Date(inputTime);
    if (isEventHour(dateTime) && dateTime.getMinutes() < startTime) {
        dateTime.setMinutes(startTime);
        return dateTime;
    }
    const nextEventHour = getNextEventHour(dateTime);
    return new Date(Date.UTC(nextEventHour.getUTCFullYear(), nextEventHour.getUTCMonth(), nextEventHour.getUTCDate(), nextEventHour.getUTCHours(), startTime));
}

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