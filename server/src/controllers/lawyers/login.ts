import { Handler } from 'express';
import argon2 from 'argon2';
import Schema from '../../schema';
import logger from '../../logger';
import { Lawyer } from '../../models';

export const login: Handler = async (req, res) => {
	try {
		const { body } = req;

		try {
			await Schema.loginLawyer.apiSchema.validate(body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}

		const { email, password } = body;

		const lawyer = await Lawyer.findOne({
			email,
		});

		if (!lawyer) {
			res.status(400).send('Unable to find a record of that account');
			return;
		}

		const validPassword = await argon2.verify(lawyer.password, password);
		if (!validPassword) {
			res.status(400).send('Invalid password');
			return;
		}

		req.session.lawyerId = lawyer.id;
		res.send(lawyer);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to login');
	}
};
