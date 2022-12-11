import { FilterQuery } from 'mongoose';
import { ClientInterface } from '../types';

interface BuildClientFilterProps {
	startDate: Date | undefined;
	endDate: Date | undefined;
}
export const buildClientFilter = ({
	startDate,
	endDate,
}: BuildClientFilterProps): FilterQuery<ClientInterface> => {
	const filter: FilterQuery<ClientInterface> = {};

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
