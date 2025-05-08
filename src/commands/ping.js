import { SlashCommandBuilder } from 'discord.js';
import { info } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong');

export async function execute(interaction) {
	info(`/ping used by ${interaction.user.tag} in ${interaction.guild?.name || 'DMs'}`);
	await interaction.reply('pong');
}
