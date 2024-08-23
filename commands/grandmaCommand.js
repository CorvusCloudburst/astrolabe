import { SlashCommandBuilder } from "discord.js";
import { grandmaIcon, mapIcons } from "../assets/externalImages.js";
import { colors } from "../lib/globals.js";
import { discordTime } from "../lib/discordUtils.js";
import { getNextGrandmaTime, getRemainingGrandmaMinutes, isGrandmaActive } from "../lib/grandma.js";


/** ---------------------------------------
 *  Displays the next dinner time
 ** --------------------------------------- */
export const grandmaCommand = {
    name: "Grandma's Dinner",
    data: new SlashCommandBuilder()
      .setName('grandma')
      .setDescription("Next dinner at Grandma's"),
    async execute(interaction) {
      const embed = grandmaEmbed();
      await interaction.reply({ embeds: [embed] });
    },
  };

  /** ---------------------------------------
 *  Generates the display card for grandma
 ** --------------------------------------- */
  const grandmaEmbed = () => {
    const isActiveNow = isGrandmaActive();
    return {
        author: {
            name: "Grandma's Dinner",
            icon_url: grandmaIcon,
          },
          color: colors.gold,
          title: isActiveNow ? 'Dinner is happening now!' : '',
          description: isActiveNow ? `${getRemainingGrandmaMinutes()} minutes of dinner remain.` : '',
          thumbnail: {
            url: mapIcons.hiddenForest.elevatedClearing,
          },
          fields: [
            {
              name: 'Next dinner starts at:',
              value: discordTime(getNextGrandmaTime()),
              inline: false,
            },
          ],
    };
  };