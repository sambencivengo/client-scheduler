import express from 'express';
import { env } from './env';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const { expressPort } = env;

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('App running'));

app.listen(expressPort, () => {
	console.log(`Application is listening on port ${env.expressPort}`);
});
