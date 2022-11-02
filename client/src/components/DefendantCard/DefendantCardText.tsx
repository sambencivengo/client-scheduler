import { Flex, Tag, Text } from '@chakra-ui/react';
import { colors } from '../../theme';

interface DefendantCardTextProps {
	field: string;
	value: string;
	tag?: boolean;
}

export const DefendantCardText = ({
	field,
	value,
	tag = false,
}: DefendantCardTextProps) => {
	return (
		<Flex
			direction={{ base: 'row', sm: 'row' }}
			alignItems={{ base: 'left', sm: 'center' }}
			justifyItems={{ base: 'left', sm: 'center' }}
			gap={2}
		>
			<Text fontWeight={'bold'} color={colors.lightGreyBlue}>
				{field}:
			</Text>
			{tag ? <Tag>{value}</Tag> : <Text>{value}</Text>}
		</Flex>
	);
};
