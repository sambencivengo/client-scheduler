import { Handler } from 'express';
import { Defendant } from '../../../models';

export const destroy: Handler = async (req, res) => {
	const { defendantId } = req.params;
	const { lawyerId } = req.session;
	try {
		const defendant = await Defendant.findOne({
			_id: defendantId,
			lawyer: lawyerId,
		});

		if (!defendant) {
			res.status(404).send('Unable to find record of defendant');
			return;
		}

		defendant.deleteOne();

		res.send('Record destroyed successfully');
	} catch (error) {
		res.status(500).send('Unable to destroy defendant');
	}
};
