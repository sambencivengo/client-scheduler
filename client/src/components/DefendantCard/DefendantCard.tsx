import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { DefendantInterface } from '../../../../shared/types';
import { colors } from '../../theme';

interface DefendantCardProps {
	defendant: DefendantInterface;
}
export const DefendantCard = ({ defendant }: DefendantCardProps) => (
	<Flex bgColor={colors.deepNavy} flexDirection={'column'}>
		<Text>
			{defendant.firstName} {defendant.lastName}
		</Text>
		<Text>{defendant.phoneNumber}</Text>
		<Text>{defendant.email}</Text>
		<Text>{defendant.meetingType}</Text>
	</Flex>
);
