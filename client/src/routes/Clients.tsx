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

export const Clients: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [clients, setClients] = React.useState<ClientInterface[]>([]);
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const isMobile = useBreakpointValue({ base: true, lg: false });

	if (requestError) return <ErrorAlert {...requestError} />;

	if (isLoading) {
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
				setIsLoading={setIsLoading}
				setClients={setClients}
				setRequestError={setRequestError}
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
