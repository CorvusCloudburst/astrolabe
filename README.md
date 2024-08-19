# astrolabe
Sky Clock + Sky Shards, for Discord.

## Setting up

### Creating a Discord application and bot user

[This tutorial](https://discordpy.readthedocs.io/en/stable/discord.html) will walk you through the process of creating a Discord application and an associated bot account.

Once your bot user is created, you will be provided with a token for it. You will only be shown this token once, so save it somewhere safe. Do not share it or merge it into a cloud-hosted code repo.

### Running Astrolabe

In the root of this project, create a `.env` file. This file is already ignored using `.gitignore`, but just in case it needs to be said, _do not merge this file into a cloud-hosted repository_.

Add the following line to your `.env`:
```
 DISCORD_TOKEN={token}
```
Where the {token} value is your bot user's token.


Then, still in your root directory, run the command:
```
npm run start
```
The application will start. You should now see the bot as logged in on your server.

## Code Changes

If you add, remove, or modify a command, you will need to deploy your new commands so that the Discord API knows how to handle them.

To deploy your commands for use on your personal server, use:
```
npm run deploy:test
```

Once you have thoroughly tested out your commands and are confident they are ready for usage, you can deploy them globally by running:
```
npm run deploy:global
```