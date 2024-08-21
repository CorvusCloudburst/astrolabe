import { SlashCommandBuilder } from "discord.js";
import { getTodaysShard, shardTypes, stringFromShard } from "../lib/shard.js";
import { discordDateToday } from "../lib/discordUtils.js";

const shardCommand = {
    name: 'Shard',
    data: new SlashCommandBuilder()
      .setName('shard')
      .setDescription('Get the next shard fall.'),
    async execute(interaction) {
      const embed = shardEmbed(getTodaysShard());
      console.dir(embed);
		  await interaction.reply({ embeds: [embed] });
	},
};

const shardEmbed = (shard) => {
  return shard.skipped 
    ? {
      author: {
        name: 'Shard',
      },
      color: 0x929292,
      title: 'No Shard',
      description: discordDateToday(),
    } 
    : {
      author: {
        name: 'Shard',
      },
      color: shard.type === shardTypes.STRONG ? 0xc40000 : 0x000000,
      title: `${shard.realm.name}: ${shard.location}`,
      description: discordDateToday(),
      fields: [
        {
          name: '1st Fall',
          value: `**${shard.realm.name}: ${shard.location}**`,
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
          name: '2nd Fall',
          value: discordTime(shard.landingTimes[2]),
          inline: true,
        },
      ],
    };
};

export default shardCommand;