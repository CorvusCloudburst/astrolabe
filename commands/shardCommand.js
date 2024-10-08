import { SlashCommandBuilder } from "discord.js";
import { getNextRedShard, getNextShard, getTodaysShard, shardTypes } from "../lib/shard.js";
import { discordDate, discordTime } from "../lib/discordUtils.js";
import { shardIcons } from "../assets/externalImages.js";
import { colors } from "../lib/globals.js";


/** ---------------------------------------
 *  Displays the next shard
 ** --------------------------------------- */
export const nextShardCommand = {
  name: 'Shard Eruption',
  data: new SlashCommandBuilder()
    .setName('shard')
    .setDescription('Next shard eruption'),
  async execute(interaction) {
    const embed = shardEmbed(getNextShard());
    await interaction.reply({ embeds: [embed] });
  },
};

/** ---------------------------------------
 *  Displays the next RED shard
 ** --------------------------------------- */
export const nextRedShardCommand = {
  name: 'Strong Shard Eruption',
  data: new SlashCommandBuilder()
    .setName('redshard')
    .setDescription('Next RED shard eruption (Gives Ascended Candles)'),
  async execute(interaction) {
    const embed = shardEmbed(getNextRedShard());
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
        icon_url: shard.type === shardTypes.STRONG ? shardIcons.red : shardIcons.black,
      },
      color: shard.type === shardTypes.STRONG ? colors.red : colors.black,
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