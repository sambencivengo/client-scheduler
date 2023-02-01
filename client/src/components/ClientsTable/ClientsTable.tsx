import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Button,
	Center,
	Heading,
} from '@chakra-ui/react';
import React from 'react';
import dayjs from 'dayjs';
import { ClientInterface } from '../../types/ClientInterface';
import { Link } from 'react-router-dom';
import { colors } from '../../theme';

interface ClientsTableProps {
	clients: ClientInterface[];
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => (
	<TableContainer>
		<Table variant="striped">
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th>Number</Th>
					<Th>Date Contacted</Th>
					<Th>Email</Th>
					<Th>Meeting Type</Th>
				</Tr>
			</Thead>
			<Tbody>
				{clients.map((client, idx) => (
					<Tr key={idx}>
						<Td>
							{client.firstName} {client.lastName}
						</Td>
						<Td>
							{client.phoneNumber === ''
								? 'N/A'
								: client.phoneNumber}
						</Td>
						<Td>
							{dayjs(client.dayOfContact).format('MM/DD/YYYY')}
						</Td>
						<Td>{client.email === '' ? 'N/A' : client.email}</Td>
						<Td>{client.meetingType}</Td>
						<Td>
							<Link to={`/clients/${client._id}`}>
								<Button>View</Button>
							</Link>
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
		{!clients.length && (
			<Center rounded="lg" p={10} bgColor={colors.deepNavy}>
				<Heading size={'md'}>No clients match this query</Heading>
			</Center>
		)}
	</TableContainer>
);
