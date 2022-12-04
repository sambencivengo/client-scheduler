import { Handler } from 'express';
import logger from '../../logger';
import { Defendant } from '../../models';
import dayjs from 'dayjs';
import Schema from '../../schema';
import { buildDefendantFilter } from '../../utils';

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

	const { lawyerId } = req.session;

	try {
		await Schema.getDefendant.apiSchema.validate({ ...req.query });
	} catch (error) {
		res.status(400).send(`Validation failed: ${error}`);
		return;
	}

	const {
		dayOfContactStart: dayOfContactStartString,
		dayOfContactEnd: dayOfContactEndString,
		meetingType,
	} = req.query;

	const dayOfContactStartDate = createDateBoundaryOrUndefined(
		dayOfContactStartString as string,
		BoundaryType.Start
	);
	const dayOfContactEndDate = createDateBoundaryOrUndefined(
		dayOfContactEndString as string,
		BoundaryType.End
	);

	const filter = buildDefendantFilter({
		startDate: dayOfContactStartDate,
		endDate: dayOfContactEndDate,
	});

	if (meetingType) {
		filter.meetingType = meetingType;
	}

	try {
		const defendants = await Defendant.find({
			...filter,
			lawyer: lawyerId,
		});

		res.send(defendants);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to get defendants');
	}
};
