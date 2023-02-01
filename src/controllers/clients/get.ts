import { Handler } from 'express';
import logger from '../../logger';
import { Client } from '../../models';
import dayjs from 'dayjs';
import Schema from '../../schema';
import { buildClientFilter } from '../../utils';
import { ClientInterface } from '../../types';

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
	const { lawyerId } = req.session;

	try {
		await Schema.getClient.apiSchema.validate({ ...req.query });
	} catch (error) {
		res.status(400).send(`Validation failed: ${error}`);
		return;
	}

	const {
		dayOfContactStart: dayOfContactStartString,
		dayOfContactEnd: dayOfContactEndString,
		meetingType,
		firstName,
		lastName,
	} = req.query;

	const dayOfContactStartDate = createDateBoundaryOrUndefined(
		dayOfContactStartString as string,
		BoundaryType.Start
	);
	const dayOfContactEndDate = createDateBoundaryOrUndefined(
		dayOfContactEndString as string,
		BoundaryType.End
	);

	const filter = buildClientFilter({
		startDate: dayOfContactStartDate,
		endDate: dayOfContactEndDate,
	});

	if (meetingType) {
		filter.meetingType = meetingType;
	}

	try {
		const clients = await Client.find({
			...filter,
			lawyer: lawyerId,
		}).sort({ dayOfContact: 'desc' });

		// WORKING NAME FILTER NOTE: Make adjustments after more testing
		const clientsFilteredByName: ClientInterface[] = [];
		if (firstName || lastName) {
			const caseAdjustedFirstName = firstName?.toString().toLowerCase();
			const caseAdjustedLastName = lastName?.toString().toLowerCase();
			clients.forEach((client) => {
				if (firstName && lastName) {
					if (
						client.firstName
							.toLowerCase()
							.includes(caseAdjustedFirstName ?? '') ||
						client.lastName
							.toLowerCase()
							.includes(caseAdjustedLastName ?? '')
					) {
						clientsFilteredByName.push(client);
					}
				} else if (
					firstName &&
					!lastName &&
					client.firstName
						.toLowerCase()
						.includes(caseAdjustedFirstName ?? '')
				)
					clientsFilteredByName.push(client);
				else if (
					lastName &&
					!firstName &&
					client.lastName
						.toLowerCase()
						.includes(caseAdjustedLastName ?? '')
				)
					clientsFilteredByName.push(client);
			});

			res.send(clientsFilteredByName);
			return;
		}

		res.send(clients);
	} catch (error) {
		logger.error(error);
		res.status(500).send('Unable to get clients');
	}
};
