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
import { ClientQueryFilter } from '../components/ClientQueryFilter';
import { ClientCard } from '../components/ClientCard';
import { ClientsTable } from '../components/ClientsTable';
import dayjs from 'dayjs';
import { MeetingType } from '../types/MeetingType';
import { useNavigate } from 'react-router-dom';

export interface FetchClientsProps {
	dayOfContactStart: Date | string;
	dayOfContactEnd: Date | string;
	meetingType?: MeetingType;
	clientName?: string;
}

export const Clients: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [clients, setClients] = React.useState<ClientInterface[]>([]);
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const navigate = useNavigate();

	React.useEffect(() => {
		fetchClients({
			dayOfContactEnd: new Date(),
			dayOfContactStart: dayjs().subtract(7, 'days').toDate(),
		});
	}, []);

	const fetchClients = async ({
		clientName,
		dayOfContactEnd,
		meetingType,
		dayOfContactStart,
	}: FetchClientsProps) => {
		const queryString = new URLSearchParams({
			dayOfContactStart: dayOfContactStart
				? dayjs(dayOfContactStart).format('YYYY-MM-DD')
				: '',
			dayOfContactEnd: dayOfContactEnd
				? dayjs(dayOfContactEnd).format('YYYY-MM-DD')
				: '',
			meetingType: meetingType ?? '',
			clientName: clientName ?? '',
		});

		try {
			setIsLoading(true);

			const res = await fetch(`/api/clients?${queryString.toString()}`);

			if (!res.ok) {
				setRequestError({
					header: 'Error fetching clients',
					message: `Unable to get clients. (Error Code: ${res.status})`,
				});
				if (res.status === 403) {
					navigate('/');
				}
				setIsLoading(false);
				return;
			}
			const clients = await res.json();
			setClients(clients);

			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const renderClients = () =>
		isMobile ? (
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
		);

	if (requestError) return <ErrorAlert {...requestError} />;

	return (
		<Flex direction={'column'} gap={10}>
			<Heading textAlign={'center'}>Clients</Heading>

			<ClientQueryFilter fetchClients={fetchClients} />

			{isLoading ? (
				<Center>
					<Spinner />
				</Center>
			) : (
				renderClients()
			)}
		</Flex>
	);
};
