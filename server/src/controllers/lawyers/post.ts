import { Handler } from 'express';
import Schema from '../..//schema';
import logger from '../../logger';

export const post: Handler = async (req, res) => {
	try {
		const { body } = req;

		// TODO: util validation method
		try {
			await Schema.createLawyer.apiSchema.validate(body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}

		const { email, password } = body;
		// TODO: hash password before saving to DB

		// TODO: hook up to db to save lawyer
		res.send({ email, password });
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to register lawyer');
	}
};
