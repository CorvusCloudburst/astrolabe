import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import shardCommand from '../commands/shard.js';

const commands = [];

const readCommand = (command) => {
    console.log(`Updating command: ${command.name}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command ${command.name} is missing a required "data" or "execute" property.`);
    }
};

readCommand(shardCommand);

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID, process.env.DISCORD_TEST_SERVER_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();