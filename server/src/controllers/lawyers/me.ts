import { Handler } from 'express';
import { Lawyer } from '../../models';
import logger from '../../logger';

export const me: Handler = async (req, res) => {
	try {
		const lawyerId = req.session.lawyerId;
		if (!lawyerId) {
			res.sendStatus(400);
			return;
		}

		const lawyerDocument = await Lawyer.findById(lawyerId);

		if (!lawyerDocument) {
			res.status(404).send('Unable to retrieve record of lawyer');
		}

		const lawyer = {
			// TODO: types for sending back lawyer DTO
			email: lawyerDocument?.email,
			id: lawyerDocument?.id,
		};

		res.send(lawyer);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to validate lawyer');
	}
};
