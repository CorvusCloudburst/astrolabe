export const dailyResetTime = 7;

/** ---------------------------------------
 * @returns true if we are currently in an event hour
 ** --------------------------------------- */
export const isEventHour = (dateTime) => {
    const hour = dateTime.getUTCHours();
    const difference = hour - dailyResetTime;
    return !(difference%2);
};

/** ---------------------------------------
 * @returns the next full event hour
 ** --------------------------------------- */
export const getNextEventHour = () => {
    const now = new Date();
    return getNextEventHourAfter(now);
};

/** ---------------------------------------
 * @returns the datetime of the next event hour after the given datetime.
 * if it is currently in an event hour, it returns the next one after.
 ** --------------------------------------- */
export const getNextEventHourAfter = (dateTime) => {
    const nextHour = isEventHour(dateTime) 
        ? dateTime.getUTCHours() + 2 
        : dateTime.getUTCHours() + 1;
    return new Date(Date.UTC(dateTime.getUTCFullYear(), dateTime.getUTCMonth(), dateTime.getUTCDate(), nextHour));
};

export const colors = {
    black: 0x000000,
    red: 0xc40048,
    blue: 0x00acc4,
    gold: 0xdb7e2e,
    green: 0x00cb85,
    white: 0xFFFFFF,
};