import { Handler } from 'express';
import { Schema } from 'mongoose';
import { Defendant } from '../../models';

export const post: Handler = async (req, res) => {
	try {
		const { name, email, phoneNumber } = req.body;

		const defendant = new Defendant({ name, email, phoneNumber });

		await defendant.save();

		res.send(defendant);
	} catch (error) {
		console.log(error);
		res.status(500).send('Unable to create a new defendant');
	}
};
