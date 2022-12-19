import {
	Center,
	Heading,
	Spinner,
	Flex,
	Box,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { ClientInterface } from '../types/ClientInterface';
import { ErrorAlert, ErrorAlertProps } from '../components/ErrorAlert';
import dayjs from 'dayjs';
import { MeetingType } from '../types/MeetingType';
import { ClientQueryFilter } from '../components/ClientQueryFilter';
import { ClientCard } from '../components/ClientCard';
import { ClientsTable } from '../components/ClientsTable';
import { useNavigate } from 'react-router-dom';

export const Clients: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [clients, setClients] = React.useState<ClientInterface[] | null>(
		null
	);
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const [startDate, setStartDate] = React.useState<Date>(
		dayjs().subtract(7, 'days').toDate() // Set start at 1 week ago
	);
	const [endDate, setEndDate] = React.useState<Date>(new Date());
	const [meetingType, setMeetingType] = React.useState<MeetingType>();
	const navigate = useNavigate();

	React.useEffect(() => {
		const queryString = new URLSearchParams({
			dayOfContactStart: startDate
				? dayjs(startDate).format('YYYY-MM-DD')
				: '',
			dayOfContactEnd: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
			meetingType: meetingType ?? '',
		});

		const getClients = async (): Promise<void> => {
			try {
				const res = await fetch(
					`/api/clients?${queryString.toString()}`
				);

				if (!res.ok) {
					setRequestError({
						header: 'Error fetching clients',
						message: `Unable to get clients. (Error Code: ${res.status})`,
					});
					if (res.status === 403) {
						navigate('/');
					}
					return;
				}
				setClients(await res.json());
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getClients();
	}, [startDate, endDate, meetingType, navigate]);

	if (requestError) return <ErrorAlert {...requestError} />;

	if (!clients || isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<Flex direction={'column'} gap={10}>
			<Heading textAlign={'center'}>Clients</Heading>
			<ClientQueryFilter
				setMeetingType={setMeetingType}
				endDate={endDate}
				startDate={startDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
			/>
			{isMobile ? (
				<Flex
					gap={5}
					borderRadius={2}
					w={'100%'}
					h={'100%'}
					justifyContent={'space-evenly'}
					wrap={'wrap'}
				>
					{clients.map((client) => (
						<Box key={client._id}>
							<ClientCard client={client} />
						</Box>
					))}
				</Flex>
			) : (
				<ClientsTable clients={clients} />
			)}
		</Flex>
	);
};
