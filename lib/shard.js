import { discordDate, discordTime } from './discordUtils.js';

/** ---------------------------------------
 * @returns a stringified shard
 ** --------------------------------------- */
export function stringFromShard(shard) {
    console.log(`Generating shard string for:\n\n${shard || 'skip day'}`);
    if (shard.skipped) {
        return `\n
            **${discordDate(shard.landingTimes[0])}**\n
            No shard today.
        `;
    }
    const stringifiedShard = `\n
        **Realm:** ${shard.realm}\n
        **Location:** ${shard.location}\n
        **Type:** ${shard.type}\n
        **Reward:** ${shard.reward}\n
        **Landing Time 1:** ${discordTime(shard.landingTimes[0])}\n
        **Landing Time 2:** ${discordTime(shard.landingTimes[1])}\n
        **Landing Time 3:** ${discordTime(shard.landingTimes[2])}\n
    `;
    console.log(`Generated shard string:\n\n${stringifiedShard}`);
    return stringifiedShard;
};

/** ---------------------------------------
 * Returns todays shard.
 * @returns shard or empty object
 ** --------------------------------------- */
export function getTodaysShard() {
    const today = new Date();
    console.log(`Today is: ${today}`);
    return getShardOnDate(today);
};


/** ---------------------------------------
 * Returns the shard on a specific day.
 * @returns shard or empty object
 ** --------------------------------------- */
export function getShardOnDate(date) {
    const day = date.getDate();
    console.log(`Getting shard for day of month: ${day}`);
    for (let realmId = 5; realmId > 0; realmId--) {
        console.log(`Checking realm ${realmId} - (${day}%${realmId}=${day%realmId})`);
        if (day%realmId===0) { // If mod = 0, the realm matches
            console.log(`Found realm: ${realms.find((realm) => realm.id === realmId).name}`);
            return getShardForRealm(realmId, date);
        }
    }
};

/** ---------------------------------------
 *  The Math:tm:
 ** --------------------------------------- */

// Get the correct level/timing group
const getShardForRealm = (realmId, date) => {
    const day = date.getDate();
    const groupId = day / realmId; // Tells us which occurence this is (first, second, etc)
    const group = levelGroups.find((group) => group.id === groupId); // Determine the group
    console.log(`Found Group: ${group.id}`);
    console.dir(group);
    const area = group.areas.find((area) => area.id === realmId); // Determine the area
    console.log(`Found area: ${area.name}`);
    console.dir(area);
    const shard = { // Final shard info
        type: group.type,
        reward: `${area.rewardAmount} ${getRewardCurrency(group.type)}`,
        realm: realms.find((realm) => realm.id === realmId),
        location: area.name,
        landingTimes: dateTimesFromShardTimes(date, group),
        skipped: isSkipDay(date, group.skipDays), // ... unless it's a skip day
    };
    console.log('Shard Details:');
    console.dir(shard);
    return shard;
};

// Returns the reward currency based on shard type
const getRewardCurrency = (type) => {
    return type === type.STRONG ? 'Ascended Candles' : 'Wax';
};

// Returns the unaltered shard, unless it's a skip day, on which it returns an empty object
const isSkipDay = (date, skipDays) => {
    const dayOfWeek = date.getUTCDay();
    console.log(`Check if today (${dayOfWeek}) is a skip day (${skipDays}) - ${skipDays.includes(dayOfWeek)}`);
    return skipDays.includes(dayOfWeek)
};

// Creates a UTC datetime for each shard time
const dateTimesFromShardTimes = (date, group) => {
    const onDateLandingTimes = group.landingHours.map((hour) => {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, group.landingMinute)
    });
    const plusOneLandingTimes = group.plusOneLandingHours.map((hour) => {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hour, group.landingMinute)
    });
    return onDateLandingTimes.concat(plusOneLandingTimes);
};

/** ---------------------------------------
 *  The Data:tm:
 ** --------------------------------------- */

// The six realms that may occur, in order
const realms = [
    {
        id: 1,
        name: 'Daylight Prairie',
    },
    {
        id: 2,
        name: 'Hidden Forest',
    },
    {
        id: 3,
        name: 'Valley of Triumph',
    },
    {
        id: 4,
        name: 'Golden Wasteland',
    },
    {
        id: 5,
        name: 'Vault of Knowledge',
    },
];

// Two types of shards
const types = {
    REGULAR: 'Regular',
    STRONG: 'Strong',
};

// Timing groups
const levelGroups = [
    {
        id: 1,
        type: types.REGULAR,
        areas: [
            {
                id: 1,
                name: 'Butterfly Fields',
                rewardAmount: 200,
            },
            {
                id: 2,
                name: 'Forest Brook',
                rewardAmount: 200,
            },
            {
                id: 3,
                name: 'Ice Rink',
                rewardAmount: 200,
            },
            {
                id: 4,
                name: 'Broken Temple',
                rewardAmount: 200,
            },
            {
                id: 5,
                name: 'Starlight Desert',
                rewardAmount: 200,
            },
        ],
        landingHours: [9,17], // UTC hours
        plusOneLandingHours: [1], // Timezones require us to account for the date rolling over
        landingMinute: 58,
        skipDays: [6, 0],
    },
    {
        id: 2,
        type: types.REGULAR,
        areas: [
            {
                id: 1,
                name: 'Village Islands',
                rewardAmount: 200,
            },
            {
                id: 2,
                name: 'Boneyard',
                rewardAmount: 200,
            },
            {
                id: 3,
                name: 'Ice Rink',
                rewardAmount: 200,
            },
            {
                id: 4,
                name: 'Battlefield',
                rewardAmount: 200,
            },
            {
                id: 5,
                name: 'Starlight Desert',
                rewardAmount: 200,
            },
        ],
        landingHours: [10,18],
        plusOneLandingHours: [2],
        landingMinute: 18,
        skipDays: [0, 1],
    },
    {
        id: 3,
        type: types.STRONG,
        areas: [
            {
                id: 1,
                name: 'Prairie Caves',
                rewardAmount: 2.0,
            },
            {
                id: 2,
                name: 'Forest End',
                rewardAmount: 2.5,
            },
            {
                id: 3,
                name: 'Village of Dreams',
                rewardAmount: 2.5,
            },
            {
                id: 4,
                name: 'Graveyard',
                rewardAmount: 2.0,
            },
            {
                id: 5,
                name: 'Jellyfish Cove',
                rewardAmount: 3.5,
            },
        ],
        landingHours: [3,21],
        plusOneLandingHours: [3],
        landingMinute: 48,
        skipDays: [1, 2],
    },
    {
        id: 4,
        type: types.STRONG,
        areas: [
            {
                id: 1,
                name: 'Bird Nest',
                rewardAmount: 2.5,
            },
            {
                id: 2,
                name: 'Treehouse',
                rewardAmount: 3.5,
            },
            {
                id: 3,
                name: 'Village of Dreams',
                rewardAmount: 2.5,
            },
            {
                id: 4,
                name: 'Crab Fields',
                rewardAmount: 2.5,
            },
            {
                id: 5,
                name: 'Jellyfish Cove',
                rewardAmount: 3.5,
            },
        ],
        landingHours: [10,16,22],
        plusOneLandingHours: [],
        landingMinute: 28,
        skipDays: [2, 3],
    },
    {
        id: 5,
        type: types.STRONG,
        areas: [
            {
                id: 1,
                name: 'Sanctuary Islands',
                rewardAmount: 3.5,
            },
            {
                id: 2,
                name: 'Elevated Clearing',
                rewardAmount: 3.5,
            },
            {
                id: 3,
                name: 'Hermit Valley',
                rewardAmount: 3.5,
            },
            {
                id: 4,
                name: 'Forgotten Ark',
                rewardAmount: 3.5,
            },
            {
                id: 5,
                name: 'Jellyfish Cove',
                rewardAmount: 3.5,
            },
        ],
        landingHours: [11,17,23],
        plusOneLandingHours: [1],
        landingMinute: 38,
        skipDays: [3, 4],
    },
];
