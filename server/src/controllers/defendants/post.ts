import { Handler } from 'express';
import logger from '../../logger';
import Schema from '../../schema';
import { Defendant } from '../../models';

export const post: Handler = async (req, res) => {
	try {
		const { body } = req;

		const lawyerId = req.session.lawyerId;
		console.log({ lawyerId });

		// TODO: util validation method
		try {
			await Schema.createDefendant.apiSchema.validate(body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}

		const { firstName, lastName, email, phoneNumber, meetingType } = body;

		const defendant = new Defendant({
			firstName,
			lastName,
			email,
			phoneNumber,
			meetingType,
			lawyer: lawyerId,
		});

		console.log(defendant);

		await defendant.save();

		res.send(defendant);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to create a new defendant');
	}
};
