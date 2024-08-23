import { SlashCommandBuilder } from "discord.js";
import { mapIcons, turtleIcon } from "../assets/externalImages.js";
import { colors } from "../lib/globals.js";
import { discordTime } from "../lib/discordUtils.js";
import { getNextTurtleTime, getRemainingTurtleMinutes, isTurtleActive } from "../lib/turtle.js";


/** ---------------------------------------
 *  Displays the next turtle time
 ** --------------------------------------- */
export const turtleCommand = {
    name: "Sunset Sanctuary Turtle",
    data: new SlashCommandBuilder()
      .setName('turtle')
      .setDescription("Next Sanctuary Turtle Sunset"),
    async execute(interaction) {
      const embed = turtleEmbed();
      await interaction.reply({ embeds: [embed] });
    },
  };

  /** ---------------------------------------
 *  Generates the display card for turtle time
 ** --------------------------------------- */
  const turtleEmbed = () => {
    const isActiveNow = isTurtleActive();
    return {
        author: {
            name: "Sunset Sanctuary Turtle",
            icon_url: turtleIcon,
          },
          color: colors.green,
          title: isActiveNow ? 'Sunset is happening now!' : '',
          description: isActiveNow ? `${getRemainingTurtleMinutes()} minutes of sunset remain.` : '',
          thumbnail: {
            url: mapIcons.daylightPrairie.sanctuaryIslands,
          },
          fields: [
            {
              name: 'Next sunset starts at:',
              value: discordTime(getNextTurtleTime()),
              inline: false,
            },
          ],
    };
  };