import { REST, Routes } from 'discord.js';
import { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } from '../config/env.js';
import { info, error } from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an array to hold the command data
const commands = [];
const commandsPath = path.join(__dirname);
const commandFiles = fs.readdirSync(commandsPath)
	.filter(file => file.endsWith('.js') && file !== 'register.js');

// loop through each command file and import it
for (const file of commandFiles) {
	const command = await import(`./${file}`);
	if (command.data) {
		commands.push(command.data.toJSON());
	}
}

// Create a new REST instance
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// register the slash commands in specific guild
try {
	info('Registering slash commands...');
	await rest.put(
		Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
		{ body: commands },
	);
	info('Slash commands registered.');
}
catch (err) {
	error('Failed to register commands:', err);
}