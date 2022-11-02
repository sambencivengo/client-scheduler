import { Handler } from 'express';
import { MeetingType } from '../../../shared/types';
import logger from '../../logger';

import { Defendant } from '../../models';

export const post: Handler = async (req, res) => {
	try {
		const { name, email, phoneNumber, meetingType } = req.body;

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
