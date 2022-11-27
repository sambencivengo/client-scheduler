import { Flex, VStack } from '@chakra-ui/react';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';
import { DefendantCardText } from './DefendantCardText';

interface DefendantCardProps {
	defendant: DefendantInterface;
}

export const DefendantCard = ({ defendant }: DefendantCardProps) => {
	const { firstName, lastName, phoneNumber, email, meetingType } = defendant;
	const fullName = `${firstName} ${lastName}`;

	return (
		<Flex
			minW={'300px'}
			gap={1}
			p={10}
			borderRadius={20}
			bgColor={colors.deepNavy}
		>
			<VStack alignItems={'left'}>
				<DefendantCardText field={'Name'} value={fullName} />
				{phoneNumber && (
					<DefendantCardText field={'Number'} value={phoneNumber} />
				)}
				{email && <DefendantCardText field={'Email'} value={email} />}
				<DefendantCardText
					field={'Meeting Type'}
					value={meetingType}
					tag={true}
				/>
			</VStack>
		</Flex>
	);
};
