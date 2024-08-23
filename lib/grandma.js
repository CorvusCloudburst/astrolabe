import { getNextEventHour, isEventHour } from "./globals.js";

const startTime = 35;
const endTime = startTime + 10;

/** ---------------------------------------
 * @returns the datetime of the next grandma
 ** --------------------------------------- */
export function getNextGrandmaTime() {
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
 * @returns true if dinner is currently being served
 ** --------------------------------------- */
export function isGrandmaActive() {
    const currentTime = new Date();
    const currentMinute = currentTime.getUTCMinutes();
    return isEventHour(currentTime) && currentMinute >= (startTime - 5) && currentMinute <= endTime;
}

/** ---------------------------------------
 * @returns the remaining minutes left of dinner time
 ** --------------------------------------- */
export function getRemainingGrandmaMinutes() {
    const currentTime = new Date();
    return isGrandmaActive() ? endTime - currentTime.getUTCMinutes() : 0;
}