import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './db';
import logger from './logger';
import { defendants } from './routes/defendants';
import * as path from 'path';

dotenv.config();

const port = env.expressPort || 8000;

const start = async () => {
	try {
		const app = express();

		app.use(cors());
		app.use(express.json());

		app.use(express.static(path.join(__dirname, './client/build')));

		app.get('/*', (_, res) => {
			res.sendFile(path.join(__dirname, './client/build', 'index.html'));
		});

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

		app.listen(port, () => {
			logger.info(`Application is listening on port ${port} 🚀`);
		});
	} catch (error) {
		logger.crit(error);
	}
};
start();
