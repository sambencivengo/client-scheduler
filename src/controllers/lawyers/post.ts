import { Handler } from 'express';
import argon2 from 'argon2';
import Schema from '../../schema';
import logger from '../../logger';
import { Lawyer } from '../../models';

export const post: Handler = async (req, res) => {
	try {
		const { body } = req;
		console.log({ body });

		// TODO: util validation method
		try {
			await Schema.createLawyer.apiSchema.validate(body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}

		const { email, password, calendlyLink } = body;

		const hashedPassword = await argon2.hash(password);

		const lawyer = new Lawyer({
			email,
			password: hashedPassword,
			calendlyLink,
		});
		await lawyer.save();

		req.session.lawyerId = lawyer.id;
		res.send(lawyer);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to register lawyer');
	}
};
