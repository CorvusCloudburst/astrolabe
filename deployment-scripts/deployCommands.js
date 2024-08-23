import { geyserCommand } from '../commands/geyserCommand.js';
import { grandmaCommand } from '../commands/grandmaCommand.js';
import { nextShardCommand, nextRedShardCommand } from '../commands/shardCommand.js';
import { turtleCommand } from '../commands/turtleCommand.js';

const readCommand = (commands, command) => {
    console.log(`Updating command: ${command.name}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command ${command.name} is missing a required "data" or "execute" property.`);
    }
};

export const allCommands = () => {
    const commands = [];

    /** ---------------------------------------
     *  ADD NEW COMMANDS HERE
     ** --------------------------------------- */
    readCommand(commands, nextShardCommand);
    readCommand(commands, nextRedShardCommand);
    readCommand(commands, geyserCommand);
    readCommand(commands, grandmaCommand);
    readCommand(commands, turtleCommand);
    /*  --------------------------------------- */

    return commands;
};