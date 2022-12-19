import { Button, Center, Flex, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { colors } from '../../theme';
import { ClientInterface } from '../../types/ClientInterface';
import { ClientCardText } from './ClientCardText';

interface ClientCardProps {
	client: ClientInterface;
}

export const ClientCard = ({ client }: ClientCardProps) => {
	const { firstName, lastName, phoneNumber, email, meetingType } = client;
	const fullName = `${firstName} ${lastName}`;

	return (
		<Flex
			minW={'300px'}
			gap={1}
			p={8}
			borderRadius={2}
			bgColor={colors.deepNavy}
		>
			<VStack alignItems={'left'}>
				<ClientCardText field={'Name'} value={fullName} />
				{phoneNumber && (
					<ClientCardText field={'Number'} value={phoneNumber} />
				)}
				{email && <ClientCardText field={'Email'} value={email} />}
				<ClientCardText
					field={'Meeting Type'}
					value={meetingType}
					tag={true}
				/>
				<Center>
					<Link
						style={{ marginTop: 10 }}
						to={`/clients/${client._id}`}
					>
						<Button>View</Button>
					</Link>
				</Center>
			</VStack>
		</Flex>
	);
};
