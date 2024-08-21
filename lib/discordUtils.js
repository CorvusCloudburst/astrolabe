export const discordDate = (dateTime) => {
    return `<t:${dateTime.getTime()/1000}:D>`;
};

export const discordTime = (dateTime) => {
    return `<t:${dateTime.getTime()/1000}:t>`;
};