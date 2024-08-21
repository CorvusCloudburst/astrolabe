import { SlashCommandBuilder } from "discord.js";
import { getTodaysShard, stringFromShard } from "../lib/shard.js";

const shardCommand = {
    name: 'Shard',
    data: new SlashCommandBuilder()
      .setName('shard')
      .setDescription('Get the next shard fall.'),
    async execute(interaction) {
		  await interaction.reply(stringFromShard(getTodaysShard()));
	},
};

export default shardCommand;