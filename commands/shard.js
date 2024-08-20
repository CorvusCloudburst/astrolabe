import { SlashCommandBuilder } from "discord.js"

const shardCommand = {
    name: 'Shard',
    data: new SlashCommandBuilder().setName('ping').setDescription('Pings!'),
    async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

export default shardCommand;