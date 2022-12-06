import { FilterQuery } from 'mongoose';
import { DefendantInterface } from '../types';

interface BuildDefendantFilterProps {
	startDate: Date | undefined;
	endDate: Date | undefined;
}
export const buildDefendantFilter = ({
	startDate,
	endDate,
}: BuildDefendantFilterProps): FilterQuery<DefendantInterface> => {
	const filter: FilterQuery<DefendantInterface> = {};

	if (startDate && endDate) {
		filter.dayOfContact = {
			$gte: startDate,
			$lte: endDate,
		};
	} else if (endDate) {
		filter.dayOfContact = {
			$lte: endDate,
		};
	} else if (startDate) {
		filter.dayOfContact = {
			$gte: startDate,
		};
	}
	return filter;
};
