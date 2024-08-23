import { SlashCommandBuilder } from "discord.js";
import { getNextGeyserTime, isGeyserActive } from "../lib/geyser.js";
import { discordTime } from "../lib/discordUtils.js";
import { colors } from "../lib/globals.js";
import { geyserIcon, mapIcons } from "../assets/externalImages.js";

/** ---------------------------------------
 * Displays the next geyser event, as well as if the geyser is currently active.
 ** --------------------------------------- */
export const geyserCommand = {
    name: "Next Geyser",
    data: new SlashCommandBuilder()
      .setName('geyser')
      .setDescription("Next geyser eruption"),
    async execute(interaction) {
		await interaction.reply({ embeds: [geyserEmbed()] });
	},
};

/** ---------------------------------------
 * Generates the embedded display card for the next upcoming geyser.
 ** --------------------------------------- */
const geyserEmbed = () =>  {
    const isActiveNow = isGeyserActive();
    return {
        author: {
            name: 'Geyser',
            icon_url: geyserIcon,
          },
          color: colors.blue,
          title: isActiveNow ? 'The geyser is currently active!' : '',
          description: isActiveNow ? `${getRemainingGeyserMinutes()} minutes remain.` : '',
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