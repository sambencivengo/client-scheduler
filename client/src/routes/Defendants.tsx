import {
	Center,
	Heading,
	Spinner,
	Flex,
	Box,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { DefendantCard } from '../components/DefendantCard';
import { DefendantInterface } from '../types/DefendantInterface';
import { ErrorAlert, ErrorAlertProps } from '../components/ErrorAlert';
import dayjs from 'dayjs';
import { DefendantsTable } from '../components/DefendantsTable';
import { MeetingType } from '../types/MeetingType';
import { DefendantQueryFilter } from '../components/DefendantQueryFilter';

export const Defendants: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [defendants, setDefendants] = React.useState<
		DefendantInterface[] | null
	>(null);
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const [startDate, setStartDate] = React.useState<Date>(
		dayjs().subtract(7, 'days').toDate() // Set start at 1 week ago
	);
	const [endDate, setEndDate] = React.useState<Date>(new Date());
	const [meetingType, setMeetingType] = React.useState<MeetingType>();

	React.useEffect(() => {
		const queryString = new URLSearchParams({
			dayOfContactStart: startDate
				? dayjs(startDate).format('YYYY-MM-DD')
				: '',
			dayOfContactEnd: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
			meetingType: meetingType ?? '',
		});

		const getDefendants = async (): Promise<void> => {
			try {
				const res = await fetch(
					`/api/defendants?${queryString.toString()}`
				);

				if (!res.ok) {
					setRequestError({
						header: 'Error fetching defendants',
						message: `Unable to get defendants. (Error Code: ${res.status})`,
					});
					return;
				}
				setDefendants(await res.json());
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getDefendants();
	}, [startDate, endDate, meetingType]);

	if (requestError) return <ErrorAlert {...requestError} />;

	if (!defendants || isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<Flex direction={'column'} gap={10}>
			<Heading textAlign={'center'}>Defendants</Heading>
			<DefendantQueryFilter
				setMeetingType={setMeetingType}
				endDate={endDate}
				startDate={startDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
			/>
			{isMobile ? (
				<Flex
					gap={5}
					borderRadius={20}
					w={'100%'}
					h={'100%'}
					justifyContent={'space-evenly'}
					wrap={'wrap'}
				>
					{defendants.map((defendant) => (
						<Box key={defendant._id}>
							<DefendantCard defendant={defendant} />
						</Box>
					))}
				</Flex>
			) : (
				<DefendantsTable defendants={defendants} />
			)}
		</Flex>
	);
};
