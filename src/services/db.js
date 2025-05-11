import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../config/env.js';
import { info, error } from '../utils/logger.js';

let client;
let db;

// Connect to MongoDB Atlas
export async function connectToDatabase() {

	// Check if already connected
	if (db) return db;

	// Check if MONGO_URI is connects
	try {
		client = new MongoClient(MONGO_URI);
		await client.connect();

		db = client.db('match_stats');
		info('Connected to MongoDB Atlas');
		return db;
	}

	// Handle connection errors
	catch (err) {
		error('Failed to connect to MongoDB:', err);
		throw err;
	}
}

// Retrieve the database instance
export function getDb() {
	if (!db) throw new Error('Database not connected. Call connectToDatabase() first.');
	return db;
}
