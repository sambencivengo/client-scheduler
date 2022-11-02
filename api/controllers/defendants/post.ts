import { Handler } from 'express';
import { Schema } from '../../../shared';
import { apiSchema } from '../../../shared/schema/createDefendant';
import { MeetingType } from '../../../shared/types';
import logger from '../../logger';

import { Defendant } from '../../models';

export const post: Handler = async (req, res) => {
	try {
		const { body } = req;

		// TODO: util validation method
		try {
			await Schema.createDefendant.apiSchema.validate(body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}

		const { name, email, phoneNumber, meetingType } = body;

		const defendant = new Defendant({
			name,
			email,
			phoneNumber,
			meetingType,
		});

		await defendant.save();

		res.send(defendant);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to create a new defendant');
	}
};
