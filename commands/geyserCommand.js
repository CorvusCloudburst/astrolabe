import { SlashCommandBuilder } from "discord.js";
import { getNextGeyserTime, isGeyserActive } from "../lib/geyser.js";
import { discordTime } from "../lib/discordUtils.js";

export const geyserCommand = {
    name: "Display the next geyser.",
    data: new SlashCommandBuilder()
      .setName('geyser')
      .setDescription("Next geyser time."),
    async execute(interaction) {
		await interaction.reply({ embeds: [geyserEmbed()] });
	},
};

const geyserEmbed = () =>  {
    return {
        author: {
            name: 'Geyser',
            icon_url: '',
          },
          color: 0x000000,
          title: `${isGeyserActive() ? 'The geyser is currently active!' : ''}`,
          description: ``,
          thumbnail: {
            url: '',
          },
          fields: [
            {
              name: 'Next geyser starts at:',
              value: discordTime(getNextGeyserTime()),
              inline: false,
            },
          ],
    };
};