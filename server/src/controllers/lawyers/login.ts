import { Handler } from 'express';
import logger from '../../logger';

export const login: Handler = async (req, res) => {
	try {
		const { body } = req;
		res.send(body);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to login');
	}
};
