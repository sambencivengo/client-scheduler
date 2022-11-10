import { Handler } from 'express';
import logger from '../../logger';
import { Defendant } from '../../models';
import * as path from 'path';
import * as fs from 'fs';
import { Schema } from '../../../shared';

export const get: Handler = async (req, res) => {
	// TODO: set up query params so Bekah can filter results based on contact date or scheduled date

	try {
		await Schema.getDefendant.apiSchema.validate({ ...req.query });
	} catch (error) {
		res.status(400).send(`Validation failed: ${error}`);
		return;
	}

	const { dayOfContact } = req.query;

	// TODO: use 2 dates to create a boundary
	console.log(dayOfContact);

	try {
		const defendants = await Defendant.find({});
		res.send(defendants);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to get defendants');
	}
};
