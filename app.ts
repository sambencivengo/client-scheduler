import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './api/db';
import logger from './api/logger';
import { defendants } from './api/routes/defendants';

dotenv.config();

const { expressPort } = env;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/defendants', defendants);
// TODO: appointments using calendly/outlook

const connect = async () => {
	try {
		await connectDb(env.database ?? '');
		logger.info('Database is connected 🔌 ✅');
	} catch (error) {
		logger.crit('❌ Unable to connect to the database ❌');
		logger.crit(error);
	}
};
connect();

app.listen(expressPort, () => {
	logger.info(`Application is listening on port ${env.expressPort} 🚀`);
});
