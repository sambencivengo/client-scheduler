import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from '@chakra-ui/react';
import React from 'react';
import dayjs from 'dayjs';
import { DefendantInterface } from '../../types/DefendantInterface';

interface DefendantsTableProps {
	defendants: DefendantInterface[];
}

export const DefendantsTable: React.FC<DefendantsTableProps> = ({
	defendants,
}) => (
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
				{defendants.map((defendant, idx) => (
					<Tr key={idx}>
						<Td>
							{defendant.firstName} {defendant.lastName}
						</Td>
						<Td>
							{defendant.phoneNumber === ''
								? 'N/A'
								: defendant.phoneNumber}
						</Td>
						<Td>
							{dayjs(defendant.dayOfContact).format('MM/DD/YYYY')}
						</Td>
						<Td>
							{defendant.email === '' ? 'N/A' : defendant.email}
						</Td>
						<Td>{defendant.meetingType}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	</TableContainer>
);
