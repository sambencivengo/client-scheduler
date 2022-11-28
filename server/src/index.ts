import express from 'express';
import cors from 'cors';
import * as dotenv_safe from 'dotenv-safe';
import { connectDb } from './db';
import logger from './logger';
import { defendants } from './routes/defendants';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';

dotenv_safe.config();

const port = process.env.PORT || 8000;

const main = async () => {
	try {
		const app = express();

		app.use(cors());
		app.use(express.json());

		// NOTE: Keep in as comment until deployment method is determined
		// app.use(express.static(path.join(__dirname, './client/build')));

		// app.get('/*', (_, res) => {
		// 	res.sendFile(path.join(__dirname, './client/build', 'index.html'));
		// });

		// Routes
		app.use('/api/defendants', defendants);
		// TODO: appointments using calendly/outlook

		const connect = async () => {
			try {
				await connectDb(process.env.MONGO_URI ?? '');
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
main();
