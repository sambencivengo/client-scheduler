import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';
import { api } from './api/routes';
import { connectDb } from './api/db';
import logger from './api/logger';

dotenv.config();

const { expressPort } = env;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('App running'));

app.use(
	'/api', // All routes that start with `/api` but not followed by `/auth`
	api
);

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
