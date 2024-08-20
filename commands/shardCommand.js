import { SlashCommandBuilder } from "discord.js";

const shardCommand = {
    name: 'Shard',
    data: new SlashCommandBuilder()
      .setName('shard')
      .setDescription('Get the next shard fall.'),
    async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

export default shardCommand;