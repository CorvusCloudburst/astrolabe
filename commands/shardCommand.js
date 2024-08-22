import { SlashCommandBuilder } from "discord.js";
import { getNextShard, getTodaysShard, shardTypes, stringFromShard } from "../lib/shard.js";
import { discordDate, discordTime } from "../lib/discordUtils.js";
import { shards } from "../assets/externalImages.js";

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
 *  Generates the display for a shard eruption
 ** --------------------------------------- */
const shardEmbed = (shard) => {
  return shard.skipped 
    ? {
      color: 0x929292,
      title: 'No shard eruption.',
      description: discordDate(shard.date),
    } 
    : {
      author: {
        name: 'Shard Eruption',
        icon_url: shard.type === shardTypes.STRONG ? shards.red : shards.black,
      },
      color: shard.type === shardTypes.STRONG ? 0xc40000 : 0x000000,
      title: `${shard.realm.name}: ${shard.location.name}`,
      description: `**Reward:** ${shard.reward}`,
      thumbnail: {
        url: shard.location.icon,
      },
      fields: [
        {
          name: '', // empty name slot to keep it on one line
          value: discordDate(shard.date),
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