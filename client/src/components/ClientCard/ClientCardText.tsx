import { Flex, Tag, Text } from '@chakra-ui/react';
import { MdPeople, MdPhone } from 'react-icons/md';
import { colors } from '../../theme';
import { MeetingType } from '../../types/MeetingType';

interface ClientCardTextProps {
	field: string;
	value: string;
	tag?: boolean;
}

export const ClientCardText = ({
	field,
	value,
	tag = false,
}: ClientCardTextProps) => {
	const meetingIcon =
		tag && value === MeetingType.InPerson ? <MdPeople /> : <MdPhone />;

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
			{tag ? (
				<Tag gap={1}>
					<Text>{value}</Text>
					{meetingIcon}
				</Tag>
			) : (
				<Text>{value}</Text>
			)}
		</Flex>
	);
};
