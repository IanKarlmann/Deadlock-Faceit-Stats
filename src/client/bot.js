// Import the Discord bot client and permission flags (called "intents")
import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from '../config/env.js';

// Create a new bot client with permission to read server messages
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,           // Access to server (guild) info
    GatewayIntentBits.GuildMessages,    // See messages in text channels
    GatewayIntentBits.MessageContent    // Actually read the message text
  ]
});

// Start bot and log in
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);
