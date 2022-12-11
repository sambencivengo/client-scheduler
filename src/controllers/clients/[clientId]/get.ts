import { Handler } from 'express';
import { Client } from '../../../models/client';

export const get: Handler = async (req, res) => {
	const { clientId } = req.params;
	const { lawyerId } = req.session;
	try {
		const client = await Client.findOne({
			_id: clientId,
			lawyer: lawyerId,
		});

		if (!client) {
			res.status(404).send('Unable to find record of client');
			return;
		}
		res.send(client);
	} catch (error) {
		res.status(500).send('Unable to get client');
	}
};
