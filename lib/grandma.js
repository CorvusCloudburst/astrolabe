import { getNextEventHour, isEventHour } from "./globals.js";

/** ---------------------------------------
 * @returns the datetime of the next grandma
 ** --------------------------------------- */
export function getNextGrandmaTime() {
    const currentTime = new Date();
    const nextEventHour = getNextEventHour(currentTime);
    nextEventHour.setMinutes(35);
    return nextEventHour;
};

/** ---------------------------------------
 * @returns true if dinner is currently being served
 ** --------------------------------------- */
export function isGrandmaActive() {
    const currentTime = new Date();
    const currentMinute = currentTime.getUTCMinutes();
    return isEventHour(currentTime) && currentMinute >= 30 && currentMinute <= 45;
}

/** ---------------------------------------
 * @returns the remaining minutes left of dinner time
 ** --------------------------------------- */
export function getRemainingGrandmaMinutes() {
    const currentTime = new Date();
    return isGrandmaActive() ? 45 - currentTime.getUTCMinutes() : 0;
}