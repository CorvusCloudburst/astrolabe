import { SlashCommandBuilder } from "discord.js";
import { candleIcon, mapIcons } from "../assets/externalImages.js";
import { getNextCandleRun } from "../lib/candleRun.js";
import { colors } from "../lib/globals.js";
import { discordTime } from "../lib/discordUtils.js";

/** ---------------------------------------
 * Displays the next continuous run of wax events.
 ** --------------------------------------- */
export const candleRunCommand = {
    name: "Candle Run",
    data: new SlashCommandBuilder()
      .setName('candlerun')
      .setDescription("Next run of wax events"),
    async execute(interaction) {
		await interaction.reply({ embeds: [candleRunEmbed()] });
	},
};

/** ---------------------------------------
 * Generates the embedded display card for the candle run.
 ** --------------------------------------- */
const candleRunEmbed = () =>  {
    const candleRun = getNextCandleRun();
    return {
        author: {
            name: 'Candle Run',
            icon_url: candleIcon,
          },
          color: colors.white,
          thumbnail: {
            url: mapIcons.valleyOfTriumph.villageOfDreams,
          },
          fields: [
            {
              name: 'Geyser:',
              value: discordTime(candleRun.geyser),
              inline: true,
            },
            {
                name: 'Grandma:',
                value: discordTime(candleRun.grandma),
                inline: true,
              },
              {
                name: 'Turtle:',
                value: discordTime(candleRun.turtle),
                inline: true,
              },
          ],
    };
};