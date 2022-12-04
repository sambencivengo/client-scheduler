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
	meetingType: MeetingType | undefined;
	setMeetingType: React.Dispatch<
		React.SetStateAction<MeetingType | undefined>
	>;
}

export const DefendantQueryFilter: React.FC<DefendantQueryFilterProps> = ({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
	meetingType,
	setMeetingType,
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
						<Select
							onChange={(e) =>
								setMeetingType(e.target.value as MeetingType)
							}
							placeholder="Select option"
						>
							<option value={MeetingType.InPerson}>
								{MeetingType.InPerson}
							</option>
							<option value={MeetingType.Phone}>
								{MeetingType.Phone}
							</option>
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
