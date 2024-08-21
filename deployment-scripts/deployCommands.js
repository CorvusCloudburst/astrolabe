import shardCommand from '../commands/shardCommand.js';

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
     *  format: readCommand(commands, {newCommand});
     ** --------------------------------------- */
    readCommand(commands, shardCommand);
    /*  --------------------------------------- */

    return commands;
};