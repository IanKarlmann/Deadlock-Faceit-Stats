import dotenv from 'dotenv';
import { error } from '../utils/logger.js';
dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DEADLOCK_API_KEY = process.env.DEADLOCK_API_KEY;
export const CLIENT_ID = process.env.CLIENT_ID;
export const GUILD_ID = process.env.GUILD_ID;
export const STEAM_API_KEY = process.env.STEAM_API_KEY;
export const MONGO_URI = process.env.MONGO_URI;

if (!DISCORD_TOKEN) {
	error('Missing DISCORD_TOKEN in environment variables.');
}
if (!DEADLOCK_API_KEY) {
	error('Missing DEADLOCK_API_KEY in environment variables.');
}
if (!CLIENT_ID) {
	error('Missing CLIENT_ID in environment variables.');
}
if (!GUILD_ID) {
	error('Missing GUILD_ID in environment variables.');
}
if (!STEAM_API_KEY) {
	error('Missing STEAM_API_KEY in environment variables.');
}
if (!MONGO_URI) {
	error('Missing MONGO_URI in environment variables.');
}
