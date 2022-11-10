import { Handler } from 'express';
import logger from '../../logger';
import { Defendant } from '../../models';
import * as path from 'path';
import * as fs from 'fs';
import { Schema } from '../../../shared';
import dayjs from 'dayjs';

export const get: Handler = async (req, res) => {
	// TODO: set up query params so Bekah can filter results based on contact date or scheduled date

	try {
		await Schema.getDefendant.apiSchema.validate({ ...req.query });
	} catch (error) {
		res.status(400).send(`Validation failed: ${error}`);
		return;
	}

	const {
		dayOfContactStart: dayOfContactStartString,
		dayOfContactEnd: dayOfContactEndString,
	} = req.query as Schema.getDefendant.ApiValues;

	const dayOfContactStartDate = dayOfContactStartString
		? dayjs(dayOfContactStartString).toISOString()
		: undefined;

	const dayOfContactEndDate = dayOfContactEndString
		? dayjs(dayOfContactEndString).toISOString()
		: undefined;

	console.log({ dayOfContactStartDate }, { dayOfContactEndDate });

	try {
		const defendants = await Defendant.find({
			$and: [
				{ dayOfContact: { $gte: dayOfContactStartDate } },
				{ dayOfContact: { $lt: dayOfContactEndDate } },
			],
		});
		res.send(defendants);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to get defendants');
	}
};
