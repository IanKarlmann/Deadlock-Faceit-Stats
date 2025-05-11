import { SlashCommandBuilder } from 'discord.js';
import { connectToDatabase } from '../services/db.js';
import { error, info } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
	.setName('entry')
	.setDescription('Submit a Deadlock match ID to retrieve player stats')
	.addStringOption(option =>
		option
			.setName('id')
			.setDescription('The match ID from the Deadlock API')
			.setRequired(true),
	);

export async function execute(interaction) {
	const matchId = interaction.options.getString('id');
	await interaction.reply(`Match ID \`${matchId}\` - Processing...`);

	try {
		const db = await connectToDatabase();
		const matches = db.collection('matches');
		const result = await matches.insertOne({ matchId });
		if (result.acknowledged) {
			await interaction.editReply(`Match ID \`${matchId}\` - Successfully submitted!`);
			info(`Match ID \`${matchId}\` submitted by ${interaction.user.tag} in ${interaction.guild?.name || 'DMs'}`);
		}
		else {
			await interaction.editReply(`Match ID \`${matchId}\` - Failed to submit.`);
			error(`Failed to submit match ID \`${matchId}\` by ${interaction.user.tag} in ${interaction.guild?.name || 'DMs'}`);
		}
	}
	catch (err) {
		await interaction.editReply(`Match ID \`${matchId}\` - Error: ${err.message}`);
		error(`Error processing match ID \`${matchId}\`: ${err.message}`);
	}
}
