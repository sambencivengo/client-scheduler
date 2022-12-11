import { Handler } from 'express';
import { Client } from '../../../models';

export const destroy: Handler = async (req, res) => {
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

		client.deleteOne();

		res.send('Record destroyed successfully');
	} catch (error) {
		res.status(500).send('Unable to destroy client');
	}
};
