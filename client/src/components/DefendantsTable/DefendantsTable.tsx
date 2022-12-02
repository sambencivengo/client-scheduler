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
import { DefendantInterface } from '../../types/DefendantInterface';

interface DefendantsTableProps {
	defendants: DefendantInterface[];
}

export const DefendantsTable: React.FC<DefendantsTableProps> = ({
	defendants,
}) => {
	return (
		<TableContainer>
			<Table variant="striped">
				<Thead>
					<Tr>
						<Th>Name</Th>
						<Th>Number</Th>
						<Th>Email</Th>
						<Th>Meeting Type</Th>
					</Tr>
				</Thead>
				<Tbody>
					{defendants.map((defendant) => (
						<Tr>
							<Td>
								{defendant.firstName} {defendant.lastName}
							</Td>
							<Td>{defendant.phoneNumber ?? 'N/A'}</Td>
							<Td>{defendant.email ?? 'N/A'}</Td>
							<Td>{defendant.meetingType}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};
