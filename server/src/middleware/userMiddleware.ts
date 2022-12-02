import { Handler } from 'express';
import { Lawyer } from '../models';

export const userMiddleWare: Handler = async (req, res, next) => {
	try {
		// grab lawyerId from session

		const { lawyerId } = req.session;

		// verify that the id belongs to an account
		const lawyer = await Lawyer.findOne({
			_id: lawyerId,
		});

		if (!lawyer) {
			res.sendStatus(403);
			return;
		}

		next();
	} catch (error) {
		res.status(500).send(
			'Encountered a server error while validating user'
		);
	}
};
