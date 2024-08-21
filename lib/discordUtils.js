export const discordDateToday = () => {
    const today = new Date();
    // Discord timestamps don't like seconds and milliseconds, just cut them off
    today.setSeconds(0);
    today.setMilliseconds(0);
    return discordDate(today);
};

export const discordDate = (dateTime) => {
    return `<t:${dateTime.getTime()/1000}:D>`;
};

export const discordTime = (dateTime) => {
    return `<t:${dateTime.getTime()/1000}:t>`;
};