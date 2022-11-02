import { Flex, Text } from '@chakra-ui/react';
import { colors } from '../../theme';

interface DefendantCardTextProps {
	field: string;
	value: string;
}

export const DefendantCardText = ({ field, value }: DefendantCardTextProps) => (
	<Flex
		direction={{ base: 'row', sm: 'row' }}
		alignItems={{ base: 'left', sm: 'center' }}
		justifyItems={{ base: 'left', sm: 'center' }}
		gap={2}
	>
		<Text fontWeight={'bold'} color={colors.lightGreyBlue}>
			{field}:
		</Text>
		<Text>{value}</Text>
	</Flex>
);
