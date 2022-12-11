import { Handler } from 'express';
import Schema from '../../../schema';
import { Defendant } from '../../../models/defendant';
import { MeetingType } from '../../../types';

export const put: Handler = async (req, res) => {
	const { lawyerId } = req.session;
	const { defendantId } = req.params;

	try {
		try {
			await Schema.editDefendant.apiSchema.validate(req.body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}
		const { firstName, lastName, phoneNumber, email, meetingType } =
			req.body;

		console.log(req.body);

		const defendant = await Defendant.findOne({
			_id: defendantId,
			lawyer: lawyerId,
		});

		if (!defendant) {
			res.status(404).send('Unable to find record of defendant');
			return;
		}
		if (firstName) defendant.firstName = firstName;
		if (lastName) defendant.lastName = lastName;
		if (phoneNumber) defendant.phoneNumber = phoneNumber;
		if (email) defendant.email = email;
		if (meetingType) defendant.meetingType = meetingType as MeetingType;

		await defendant.save();

		res.send(defendant);
	} catch (error) {
		res.status(500).send('Unable to get defendant');
	}
};
