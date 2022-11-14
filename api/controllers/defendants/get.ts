import { Handler } from 'express';
import logger from '../../logger';
import { Defendant } from '../../models';
import * as path from 'path';
import * as fs from 'fs';
import { Schema } from '../../../shared';
import dayjs from 'dayjs';
import { LogError } from 'concurrently';

enum BoundaryType {
	Start = 'Start',
	End = 'End',
}
const createDateBoundaryOrUndefined = (
	timeString: string | undefined,
	boundary: BoundaryType
) => {
	if (timeString) {
		const dayjsDate = dayjs(timeString);
		if (boundary === BoundaryType.Start) {
			return new Date(dayjsDate.startOf('day').toISOString());
		}
		return new Date(dayjsDate.endOf('day').toISOString());
	}
	return undefined;
};

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

	const dayOfContactStartDate = createDateBoundaryOrUndefined(
		dayOfContactStartString,
		BoundaryType.Start
	);

	const dayOfContactEndDate = createDateBoundaryOrUndefined(
		dayOfContactEndString,
		BoundaryType.End
	);

	// if start exist

	// if end exists

	const filter = { dayOfContact: {} };

	const filter2 =
		dayOfContactStartDate || dayOfContactEndDate
			? {
					dayOfContact: {
						$gte: dayOfContactStartDate,
						$lte: dayOfContactEndDate,
					},
			  }
			: undefined;

	console.log(dayOfContactStartDate, dayOfContactEndDate, filter);

	try {
		const defendants = await Defendant.find({
			dayOfContact: {
				$gte: dayOfContactStartDate,
				$lte: dayOfContactEndDate,
			},
		});
		res.send(defendants);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to get defendants');
	}
};
