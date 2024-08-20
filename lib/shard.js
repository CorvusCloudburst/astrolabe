export function getNextShard() {

};

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

// Odd days are Strong, even days are Regular
const isStrong = (day) => {
    return day % 2;
};

// Depends on whether the shard is Strong or not
const getRewardCurrency = (day) => {
    isStrong(day) ? 'Ascended Candles' : 'Wax';
};

// The realms alternate in order, so it's easy to calculate by using the mod operator just like strength
const getRealm = (day) => {
    return realms.find((realm) => realm.id % day === 0);
};

const schedule = [
    {
        day: 1,
        type: 'Strong',
        realm: 'Daylight Prairie',
        location: 'Prairie Caves',
        reward: '2 Ascended Candles',
        excludedDays: [2,3],
        landingTimes: ['07:48', '13:48', '19:48'],
    },
    {
        day: 2,
        type: 'Regular',
        realm: 'Hidden Forest',
        location: 'Boneyard',
        reward: '200 Wax',
        excludedDays: [1,2],
        landingTimes: ['02:18', '10:18', '14:18'],
    },
    {
        day: 3,
        type: 'Strong',
        realm: 'Valley of Triumph',
        location: 'Village of Dreams',
        reward: '2.5 Ascended Candles',
        excludedDays: [3,4],
        landingTimes: ['02:28', '08:28', '14:28'],
    },
    {
        day: 4,
        type: 'Regular',
        realm: 'Golden Wasteland',
        location: 'Broken Temple',
        reward: '200 Wax',
        excludedDays: [1,7],
        landingTimes: ['01:58', '09:58', '17:58'],
    },
    {
        day: 5,
        type: 'Strong',
        realm: 'Vault of Knowledge',
        location: 'Jellyfish Cove',
        reward: '3.5 Ascended Candles',
        excludedDays: [4,5],
        landingTimes: ['03:38', '09:38', '15:38'],
    },
    {
        day: 6,
        type: 'Regular',
        realm: 'Vault of Knowledge',
        location: 'Jellyfish Cove',
        reward: '3.5 Ascended Candles',
        excludedDays: [4,5],
        landingTimes: ['03:38', '09:38', '15:38'],
    },
];