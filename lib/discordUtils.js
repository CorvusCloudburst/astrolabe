export const discordDateToday = () => {
    const today = cleanDateForDiscord(new Date());
    return discordDate(today);
};

export const discordDate = (dateTime) => {
    const date = cleanDateForDiscord(dateTime);
    return `<t:${date.getTime()/1000}:D>`;
};

export const discordTime = (dateTime) => {
    const date = cleanDateForDiscord(dateTime);
    return `<t:${date.getTime()/1000}:t>`;
};

const cleanDateForDiscord = (date) => {
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};