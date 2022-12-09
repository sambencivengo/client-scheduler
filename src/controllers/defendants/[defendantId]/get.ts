import { Handler } from 'express';
import { Defendant } from '../../../models/defendant';

export const get: Handler = async (req, res) => {
	const { defendantId } = req.params;
	const { lawyerId } = req.session;
	try {
		const defendant = await Defendant.findOne({
			_id: defendantId,
			lawyer: lawyerId,
		});
		res.send(defendant);
	} catch (error) {
		res.status(500).send('Unable to get defendant');
	}
};
