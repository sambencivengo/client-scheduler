import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';
import { appointments } from './api/routes/appointments';
import { api } from './api/routes';

dotenv.config();

const { expressPort } = env;

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('App running'));

app.use(
	'/api', // All routes that start with `/api` but not followed by `/auth`
	api
);

app.listen(expressPort, () => {
	console.log(`Application is listening on port ${env.expressPort}`);
});
