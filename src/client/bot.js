import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from '../config/env.js';
import { info, warn, error } from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// setup __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// store commands in a Map for easy access
const commands = new Map();
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath)
	.filter(file => file.endsWith('.js') && file !== 'register.js');

// import each command file
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = await import(pathToFileURL(filePath).href);

	// Check if the command has the required properties
	if (command.data && command.execute) {
		commands.set(command.data.name, command);
		info(`Loaded command: /${command.data.name}`);
	}
	else {
		warn(`Command in ${file} is missing required properties.`);
	}
}

// Create a new bot client with permission to read server messages
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Start bot and log in
client.once('ready', () => {
	info(`Bot is online as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (err) {
		error(`Error executing /${interaction.commandName}: ${err.message}`);
		await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
	}
});

client.login(DISCORD_TOKEN);