import { getNextEventHour, isEventHour } from "./globals.js";

const startTime = 35;
const endTime = startTime + 10;

/** ---------------------------------------
 * @returns the datetime of the next grandma
 ** --------------------------------------- */
export function getNextGrandmaTime() {
    const currentTime = new Date();
    return getNextGrandmaAfter(currentTime);
};

/** ---------------------------------------
 * @returns the datetime of the next grandma after the provided datetime
 ** --------------------------------------- */
export function getNextGrandmaAfter(inputTime) {
    const dateTime = new Date(inputTime);
    if (isEventHour(dateTime) && dateTime.getMinutes() < startTime) {
        dateTime.setMinutes(startTime);
        return dateTime;
    }
    const nextEventHour = getNextEventHour(dateTime);
    return new Date(Date.UTC(nextEventHour.getUTCFullYear(), nextEventHour.getUTCMonth(), nextEventHour.getUTCDate(), nextEventHour.getUTCHours(), startTime));
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