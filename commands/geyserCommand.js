import { SlashCommandBuilder } from "discord.js";
import { getNextGeyserTime, isGeyserActive } from "../lib/geyser.js";
import { discordTime } from "../lib/discordUtils.js";
import { colors } from "../lib/globals.js";
import { geyserIcon, mapIcons } from "../assets/externalImages.js";

/** ---------------------------------------
 * Displays the next geyser event, as well as if the geyser is currently active.
 ** --------------------------------------- */
export const geyserCommand = {
    name: "Display the next geyser.",
    data: new SlashCommandBuilder()
      .setName('geyser')
      .setDescription("Next geyser time."),
    async execute(interaction) {
		await interaction.reply({ embeds: [geyserEmbed()] });
	},
};

/** ---------------------------------------
 * Generates the embedded display card for the next upcoming geyser.
 ** --------------------------------------- */
const geyserEmbed = () =>  {
    return {
        author: {
            name: 'Geyser',
            icon_url: geyserIcon,
          },
          color: colors.blue,
          title: `${isGeyserActive() ? `The geyser is currently active! ${getRemainingGeyserMinutes()} minutes remain.` : ''}`,
          description: ``,
          thumbnail: {
            url: mapIcons.daylightPrairie.sanctuaryIslands,
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