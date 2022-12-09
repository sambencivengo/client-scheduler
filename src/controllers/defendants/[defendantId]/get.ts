import { Handler } from 'express';
import { Defendant } from '../../../models/defendant';

export const get: Handler = async (req, res) => {
	console.log('in route');
	const { defendantId } = req.params;

	const defendant = await Defendant.findById(defendantId);

	res.send(defendant);
};
