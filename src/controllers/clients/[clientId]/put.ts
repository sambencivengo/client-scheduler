import { Handler } from 'express';
import Schema from '../../../schema';
import { Client } from '../../../models/client';
import { MeetingType } from '../../../types';

export const put: Handler = async (req, res) => {
	const { lawyerId } = req.session;
	const { clientId } = req.params;

	try {
		try {
			await Schema.editClient.apiSchema.validate(req.body);
		} catch (error) {
			res.status(400).send(`Validation failed: ${error}`);
			return;
		}
		const { firstName, lastName, phoneNumber, email, meetingType } =
			req.body;

		const client = await Client.findOne({
			_id: clientId,
			lawyer: lawyerId,
		});

		if (!client) {
			res.status(404).send('Unable to find record of client');
			return;
		}
		if (firstName) client.firstName = firstName;
		if (lastName) client.lastName = lastName;
		if (phoneNumber) client.phoneNumber = phoneNumber;
		if (email) client.email = email;
		if (meetingType) client.meetingType = meetingType as MeetingType;

		await client.save();

		res.send(client);
	} catch (error) {
		res.status(500).send('Unable to get client');
	}
};
