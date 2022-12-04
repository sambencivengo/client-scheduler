import {
	Box,
	Flex,
	Text,
	Heading,
	useBreakpointValue,
	Center,
	Select,
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import React from 'react';
import { MeetingType } from '../../types/MeetingType';

interface DefendantQueryFilterProps {
	startDate: Date;
	setStartDate: React.Dispatch<React.SetStateAction<Date>>;
	endDate: Date;
	setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const DefendantQueryFilter: React.FC<DefendantQueryFilterProps> = ({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
}) => {
	const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<React.Fragment>
			<Center>
				<Flex
					justifyContent={'center'}
					flexDir={isMobile ? 'column' : 'row'}
					gap={3}
				>
					<Box>
						<Heading mb={3} textAlign="center" size="sm">
							Start Date
						</Heading>

						<SingleDatepicker
							date={startDate}
							onDateChange={setStartDate}
						/>
					</Box>
					<Box>
						<Heading mb={3} textAlign="center" size="sm">
							End Date
						</Heading>

						<SingleDatepicker
							date={endDate}
							onDateChange={setEndDate}
						/>
					</Box>

					<Box>
						<Heading mb={3} textAlign="center" size="sm">
							Meeting Type
						</Heading>
						<Select placeholder="Select option">
							<option value="option1">
								{MeetingType.InPerson}
							</option>
							<option value="option1">{MeetingType.Phone}</option>
						</Select>
					</Box>
				</Flex>
			</Center>

			<Text textAlign="center" opacity={0.6} as="i">
				Date range will default to the last 7 days
			</Text>
		</React.Fragment>
	);
};
