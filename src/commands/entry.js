import { SlashCommandBuilder } from 'discord.js';
import { connectToDatabase } from '../services/db.js';
import { fetchPlayersStats } from '../api/deadlock.js';
import { error, info } from '../utils/logger.js';

// Sets up the command for the Discord bot
export const data = new SlashCommandBuilder()
	.setName('entry')
	.setDescription('Submit a Deadlock match ID to retrieve player stats')
	.addStringOption(option =>
		option
			.setName('id')
			.setDescription('The match ID from the Deadlock API')
			.setRequired(true),
	);

// Executes the command when called
export async function execute(interaction) {

	// Get the match ID from the interaction
	const matchId = interaction.options.getString('id');
	await interaction.reply(`Match ID \`${matchId}\` - Processing...`);

	try {
		// Fetch player stats from the Deadlock API
		const matchData = await fetchPlayersStats(matchId);

		// Check if the match data was fetched successfully
		if (!matchData) {
			await interaction.editReply(`Match ID \`${matchId}\` - Failed to fetch player stats.`);
			error(`Failed to fetch player stats for match ID \`${matchId}\` by ${interaction.user.tag} in ${interaction.guild?.name || 'DMs'}`);
			return;
		}

		// Connect to the database
		const db = await connectToDatabase();
		const matches = db.collection('matches');

		// Add the match data to the database
		const result = await matches.updateOne(
			{ _id: matchId },
			{ $set: { data: matchData } },
			{ upsert: true },
		);

		// Check if the match data was inserted successfully
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
