import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';
import { appointments } from './api/routes/appointments';
import { api } from './api/routes';
import { connectDb } from './api/db';

dotenv.config();

const { expressPort } = env;

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('App running'));

app.use(
	'/api', // All routes that start with `/api` but not followed by `/auth`
	api
);

const connect = async () => {
	try {
		await connectDb(env.database ?? '');
		console.log('Database is connected');
	} catch (error) {
		console.log(error);
	}
};
connect();

app.listen(expressPort, () => {
	console.log(`Application is listening on port ${env.expressPort}`);
});
