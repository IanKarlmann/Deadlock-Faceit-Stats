// src/api/deadlock.js
import axios from 'axios';
import { info, error } from '../utils/logger.js';

/**
 * Fetch match stats from the Deadlock API
 * @param {string} matchId
 * @returns {Object|null} - Match stats or null if failed
 */

export async function fetchPlayersStats(matchId) {

	const response = await axios.get(`https://api.deadlock-api.com/v1/matches/metadata?include_info=false&include_damage_matrix=false&include_objectives=false&include_mid_boss=false&include_player_info=true&include_player_items=false&include_player_stats=false&include_player_death_details=false&match_ids=${matchId}&is_high_skill_range_parties=false&is_low_pri_pool=false&is_new_player_pool=false&order_by=match_id&order_direction=asc`);
	info(response.data);
	info(response.status);

	const matchData = response.data;

	// Check if the response is valid
	if (response.status !== 200) {
		error('Deadlock API error:', response.status, response.statusText);
		return null;
	}

	info(`Fetched data for match ${matchId}`);
	return matchData;

}
