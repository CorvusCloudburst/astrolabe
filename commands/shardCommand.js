import { SlashCommandBuilder } from "discord.js";
import { getNextShard, getTodaysShard, shardTypes, stringFromShard } from "../lib/shard.js";
import { discordDate, discordDateToday, discordTime } from "../lib/discordUtils.js";

/** ---------------------------------------
 *  Displays today's shard info
 ** --------------------------------------- */
export const shardCommand = {
    name: 'Shard',
    data: new SlashCommandBuilder()
      .setName('shard')
      .setDescription("Get today's shard fall."),
    async execute(interaction) {
      const embed = shardEmbed(getTodaysShard());
		  await interaction.reply({ embeds: [embed] });
	},
};

/** ---------------------------------------
 *  Displays the next non-skipped shard
 ** --------------------------------------- */
export const nextShardCommand = {
  name: 'Next Shard',
  data: new SlashCommandBuilder()
    .setName('nextshard')
    .setDescription('Get the next shard fall.'),
  async execute(interaction) {
    const embed = shardEmbed(getNextShard());
    await interaction.reply({ embeds: [embed] });
},
};

/** ---------------------------------------
 *  Generates the display for a shard
 ** --------------------------------------- */
const shardEmbed = (shard) => {
  return shard.skipped 
    ? {
      author: {
        name: 'Shard',
      },
      color: 0x929292,
      title: 'No Shard',
      description: discordDate(shard.date),
    } 
    : {
      author: {
        name: 'Shard',
        icon_url: shard.type === shardTypes.STRONG ? 'https://i.imgur.com/bh4b6P4.png' : 'https://i.imgur.com/PEv10fl.png',
      },
      color: shard.type === shardTypes.STRONG ? 0xc40000 : 0x000000,
      title: `${shard.realm.name}: ${shard.location}`,
      description: discordDate(shard.date),
      fields: [
        {
          name: '', // empty name slot to keep it on one line
          value: `**Reward:** ${shard.reward}`,
          inline: false,
        },
        {
          name: '1st Fall',
          value: discordTime(shard.landingTimes[0]),
          inline: true,
        },
        {
          name: '2nd Fall',
          value: discordTime(shard.landingTimes[1]),
          inline: true,
        },
        {
          name: '3rd Fall',
          value: discordTime(shard.landingTimes[2]),
          inline: true,
        },
      ],
    };
};