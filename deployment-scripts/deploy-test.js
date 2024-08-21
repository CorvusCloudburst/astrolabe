import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { allCommands } from './deployCommands.js';

const commands = allCommands();

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Push to test server only
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DISCORD_TEST_SERVER_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();