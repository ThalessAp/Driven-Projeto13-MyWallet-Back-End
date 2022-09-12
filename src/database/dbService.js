import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

try {
	await new MongoClient(process.env.MONGO_URI).connect;
} catch (error) {
	console.error(error.message);
}

const db = MongoClient.db(process.env.DATABASE_URI);

export default {
	db,
};
