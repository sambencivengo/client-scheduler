import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './db';
import logger from './logger';
import { defendants } from './routes/defendants';
import * as path from 'path';

dotenv.config();

const server = express();

const port = env.expressPort || 8000;

server.use(cors());
server.use(express.json());

server.use(express.static(path.join(__dirname, './client/build')));

server.get('/*', (_, res) => {
	res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

// Routes
server.use('/api/defendants', defendants);
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

server.listen(port, () => {
	logger.info(`serverlication is listening on port ${port} 🚀`);
});
