import { Button, Center, Flex, HStack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { colors } from '../../theme';
import { ClientInterface } from '../../types/ClientInterface';
import { BsPersonCircle } from 'react-icons/bs';

import { EditClientForm } from '../EditClientForm';
import { ClientCardText } from '../ClientCard/ClientCardText';
import { DeleteClientConfirmation } from '../DeleteClientConfirmation';

interface ClientProfileProps {
	selectedClient: ClientInterface;
}

export const ClientProfile = ({ selectedClient }: ClientProfileProps) => {
	const [client, setClient] = React.useState<ClientInterface>(selectedClient);
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

	if (isEditing) {
		return (
			<EditClientForm
				client={client}
				setClient={setClient}
				setIsEditing={setIsEditing}
			/>
		);
	}

	return (
		<Flex
			minW={'auto'}
			gap={1}
			p={10}
			borderRadius={2}
			bgColor={colors.deepNavy}
			justifyContent="center"
		>
			<VStack spacing={8}>
				<BsPersonCircle size={50} />
				<VStack alignItems={'left'}>
					<ClientCardText
						field={'First Name'}
						value={client.firstName}
					/>
					<ClientCardText
						field={'Last Name'}
						value={client.lastName}
					/>
					<ClientCardText
						field={'Day of Contact'}
						value={dayjs(client.dayOfContact).format('MM/DD/YYYY')}
					/>
					{client.phoneNumber && (
						<ClientCardText
							field={'Phone'}
							value={client.phoneNumber}
						/>
					)}
					{client.email && (
						<ClientCardText field={'Email'} value={client.email} />
					)}
					<ClientCardText
						field={'Meeting Type'}
						value={client.meetingType}
					/>
				</VStack>
				<Center>
					{isDeleting ? (
						<DeleteClientConfirmation
							setIsDeleting={setIsDeleting}
						/>
					) : (
						<HStack>
							<Button onClick={() => setIsEditing(true)}>
								Edit
							</Button>
							<Button
								bgColor={colors.red}
								onClick={() => setIsDeleting(true)}
							>
								Delete
							</Button>
						</HStack>
					)}
				</Center>
			</VStack>
		</Flex>
	);
};
