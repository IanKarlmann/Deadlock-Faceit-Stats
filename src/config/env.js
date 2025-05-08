import dotenv from 'dotenv';
dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DEADLOCK_API_KEY = process.env.DEADLOCK_API_KEY;

if (!DISCORD_TOKEN || !DEADLOCK_API_KEY) {
  throw new Error('Missing DISCORD_TOKEN or DEADLOCK_API_KEY in .env file.');
}