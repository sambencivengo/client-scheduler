import { Handler } from 'express';
import logger from '../../logger';
import Schema from '../../schema';
import { Defendant } from '../../models';

export const post: Handler = async (req, res) => {
	try {
		// TODO: util validation method
		try {
			await Schema.createDefendant.apiSchema.validate(req.body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}

		const { firstName, lastName, email, phoneNumber, meetingType } =
			req.body;

		const defendant = new Defendant({
			firstName,
			lastName,
			email,
			phoneNumber,
			meetingType,
			lawyer: req.session.lawyerId,
		});

		await defendant.save();

		res.send(defendant);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to create a new defendant');
	}
};
