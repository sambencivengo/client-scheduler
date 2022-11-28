import { Handler } from 'express';
import logger from '../../logger';

export const post: Handler = async (req, res) => {
	try {
		console.log(req);
		res.send('in post');
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to register lawyer');
	}
};
