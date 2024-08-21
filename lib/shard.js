import { mapIcons } from '../assets/externalImages.js';
import { discordDate, discordTime } from './discordUtils.js';

/** ---------------------------------------
 * @returns a stringified shard
 * This is the original MVP response from when the bot was first made.
 * Useful for debugging.
 ** --------------------------------------- */
export function stringFromShard(shard) {
    const today = new Date();
    // Discord timestamps don't like seconds and milliseconds, just cut them off
    today.setSeconds(0);
    today.setMilliseconds(0);

    if (shard.skipped) {
        return `.\n
            **${discordDate(today)}**\n
            No shard today.
        `;
    }
    const stringifiedShard = `.\n
        **${discordDate(today)}**\n
        **Realm:** ${shard.realm.name}\n
        **Location:** ${shard.location}\n
        **Type:** ${shard.type}\n
        **Reward:** ${shard.reward}\n
        **Landing Time 1:** ${discordTime(shard.landingTimes[0])}\n
        **Landing Time 2:** ${discordTime(shard.landingTimes[1])}\n
        **Landing Time 3:** ${discordTime(shard.landingTimes[2])}\n
    `;
    return stringifiedShard;
};

/** ---------------------------------------
 * @returns todays shard
 ** --------------------------------------- */
export function getTodaysShard() {
    const today = new Date();
    return getShardOnDate(today);
};

/** ---------------------------------------
 * @returns the next non-skipped shard
 ** --------------------------------------- */
export function getNextShard() {
    const today = new Date();
    return getNextShardAfter(today);
};

/** ---------------------------------------
 * @returns the next non-skipped shard starting on the provided day
 ** --------------------------------------- */
export function getNextShardAfter(date) {
    const shard = getShardOnDate(date);

    if (shard.skipped) {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate()+1);
        return getNextShardAfter(nextDay);
    } else {
        return shard;
    }
}


/** ---------------------------------------
 * @returns shard on a specific day
 ** --------------------------------------- */
export function getShardOnDate(date) {
    const day = date.getDate();
    for (let realmId = 5; realmId > 0; realmId--) {
        if (day%realmId===0) { // If mod = 0, the realm matches
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

    const groupId = getTimingGroup(day);
    const group = levelGroups.find((group) => group.id === groupId);

    const location = group.locations.find((location) => location.id === realmId);

    const shard = { // Final shard info
        date: date,
        type: group.type,
        reward: `${location.rewardAmount} ${getRewardCurrency(group.type)}`,
        realm: realms.find((realm) => realm.id === realmId),
        location: location,
        landingTimes: dateTimesFromShardTimes(date, group),
        skipped: isSkipDay(date, group.skipDays), // ... unless it's a skip day
    };
    return shard;
};

// Returns the timing group for the given day of the month
const getTimingGroup = (day) => {
    return timingOrder[(day%timingOrder.length)-1];
};

// Returns the reward currency based on shard type
const getRewardCurrency = (type) => {
    return type === type.STRONG ? 'Ascended Candles' : 'Wax';
};

// Returns the unaltered shard, unless it's a skip day, on which it returns an empty object
const isSkipDay = (date, skipDays) => {
    const dayOfWeek = date.getDay();
    return skipDays.includes(dayOfWeek)
};

// Creates datetime for each shard time
const dateTimesFromShardTimes = (date, group) => {
    // Use UTC for consistency - UNIX timestasmps will convert for us later
    const onDateLandingTimes = group.landingHours.map((hour) => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, group.landingMinute));
    });
    const plusOneLandingTimes = group.plusOneLandingHours.map((hour) => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()+1, hour, group.landingMinute));
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
export const shardTypes = {
    REGULAR: 'Regular / Black',
    STRONG: 'Strong / Red',
};

// Order of timing groups
const timingOrder = [2,1,3,0,4,1,2,0,3,1,4,0];

// Timing groups
const levelGroups = [
    {
        id: 0,
        type: shardTypes.REGULAR,
        locations: [
            {
                id: 1,
                name: 'Butterfly Fields',
                rewardAmount: 200,
                icon: mapIcons.daylightPrairie.butterflyFields,
            },
            {
                id: 2,
                name: "Forest's Brook",
                rewardAmount: 200,
                icon: mapIcons.hiddenForest.forestsBrook,
            },
            {
                id: 3,
                name: 'Ice Rink',
                rewardAmount: 200,
                icon: mapIcons.valleyOfTriumph.iceRink,
            },
            {
                id: 4,
                name: 'Broken Temple',
                rewardAmount: 200,
                icon: mapIcons.goldenWasteland.brokenTemple,
            },
            {
                id: 5,
                name: 'Starlight Desert',
                rewardAmount: 200,
                icon: mapIcons.vaultOfKnowledge.starlightDesert,
            },
        ],
        landingHours: [8,16], // UTC hours
        plusOneLandingHours: [0], // Timezones require us to account for the date rolling over
        landingMinute: 58,
        skipDays: [6, 0],
    },
    {
        id: 1,
        type: shardTypes.REGULAR,
        locations: [
            {
                id: 1,
                name: 'Prairie Village',
                rewardAmount: 200,
                icon: mapIcons.daylightPrairie.prairieVillage,

            },
            {
                id: 2,
                name: 'Boneyard',
                rewardAmount: 200,
                icon: mapIcons.hiddenForest.boneyard,
            },
            {
                id: 3,
                name: 'Ice Rink',
                rewardAmount: 200,
                icon: mapIcons.valleyOfTriumph.iceRink,
            },
            {
                id: 4,
                name: 'Battlefield',
                rewardAmount: 200,
                icon: mapIcons.goldenWasteland.battlefield,
            },
            {
                id: 5,
                name: 'Starlight Desert',
                rewardAmount: 200,
                icon: mapIcons.vaultOfKnowledge.starlightDesert,
            },
        ],
        landingHours: [9,17],
        plusOneLandingHours: [1],
        landingMinute: 18,
        skipDays: [0, 1],
    },
    {
        id: 2,
        type: shardTypes.STRONG,
        locations: [
            {
                id: 1,
                name: 'Prairie Caves',
                rewardAmount: 2.0,
                icon: mapIcons.daylightPrairie.prairieCaves,
            },
            {
                id: 2,
                name: 'Forest End',
                rewardAmount: 2.5,
                icon: mapIcons.hiddenForest.forestEnd,
            },
            {
                id: 3,
                name: 'Village of Dreams',
                rewardAmount: 2.5,
                icon: mapIcons.valleyOfTriumph.villageOfDreams,
            },
            {
                id: 4,
                name: 'Graveyard',
                rewardAmount: 2.0,
                icon: mapIcons.goldenWasteland.graveyard,
            },
            {
                id: 5,
                name: 'Jellyfish Cove',
                rewardAmount: 3.5,
                icon: mapIcons.vaultOfKnowledge.jellyfishCove,
            },
        ],
        landingHours: [2,20],
        plusOneLandingHours: [2],
        landingMinute: 48,
        skipDays: [1, 2],
    },
    {
        id: 3,
        type: shardTypes.STRONG,
        locations: [
            {
                id: 1,
                name: 'Bird Nest',
                rewardAmount: 2.5,
                icon: mapIcons.daylightPrairie.birdNest,
            },
            {
                id: 2,
                name: 'Treehouse',
                rewardAmount: 3.5,
                icon: mapIcons.hiddenForest.treehouse,
            },
            {
                id: 3,
                name: 'Village of Dreams',
                rewardAmount: 2.5,
                icon: mapIcons.valleyOfTriumph.villageOfDreams,
            },
            {
                id: 4,
                name: 'Crab Fields',
                rewardAmount: 2.5,
                icon: mapIcons.goldenWasteland.crabFields,
            },
            {
                id: 5,
                name: 'Jellyfish Cove',
                rewardAmount: 3.5,
                icon: mapIcons.vaultOfKnowledge.jellyfishCove,
            },
        ],
        landingHours: [9,15,21],
        plusOneLandingHours: [],
        landingMinute: 28,
        skipDays: [2, 3],
    },
    {
        id: 4,
        type: shardTypes.STRONG,
        locations: [
            {
                id: 1,
                name: 'Sanctuary Islands',
                rewardAmount: 3.5,
                icon: mapIcons.daylightPrairie.sanctuaryIslands,
            },
            {
                id: 2,
                name: 'Elevated Clearing',
                rewardAmount: 3.5,
                icon: mapIcons.hiddenForest.elevatedClearing,
            },
            {
                id: 3,
                name: 'Hermit Valley',
                rewardAmount: 3.5,
                icon: mapIcons.valleyOfTriumph.hermitValley,
            },
            {
                id: 4,
                name: 'Forgotten Ark',
                rewardAmount: 3.5,
                icon: mapIcons.goldenWasteland.forgottenArk,
            },
            {
                id: 5,
                name: 'Jellyfish Cove',
                rewardAmount: 3.5,
                icon: mapIcons.vaultOfKnowledge.jellyfishCove,
            },
        ],
        landingHours: [10,16,22],
        plusOneLandingHours: [],
        landingMinute: 38,
        skipDays: [3, 4],
    },
];
