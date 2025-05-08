import dotenv from 'dotenv';
dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DEADLOCK_API_KEY = process.env.DEADLOCK_API_KEY;
export const CLIENT_ID = process.env.CLIENT_ID;
export const GUILD_ID = process.env.GUILD_ID;

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