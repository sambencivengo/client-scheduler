import { Flex, VStack } from '@chakra-ui/react';
import { DefendantInterface } from '../../../../shared/types';
import { colors } from '../../theme';
import { DefendantCardText } from './DefendantCardText';

interface DefendantCardProps {
	defendant: DefendantInterface;
}

export const DefendantCard = ({ defendant }: DefendantCardProps) => {
	const { firstName, lastName, phoneNumber, email, meetingType } = defendant;
	const fullName = `${firstName} ${lastName}`;

	return (
		<Flex
			wrap={'wrap'}
			minW={'350px'}
			gap={1}
			p={10}
			borderRadius={20}
			bgColor={colors.deepNavy}
			justifyContent={'space-around'}
		>
			<VStack alignItems={'left'}>
				<DefendantCardText field={'Name'} value={fullName} />
				{phoneNumber && (
					<DefendantCardText
						field={'Phone Number'}
						value={phoneNumber}
					/>
				)}
				{email && <DefendantCardText field={'Email'} value={email} />}
				<DefendantCardText field={'Meeting Type'} value={meetingType} />
			</VStack>
		</Flex>
	);
};
