import { Button, Center, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';
import { DefendantCardText } from '../DefendantCard/DefendantCardText';

interface DefendantProfileProps {
	defendant: DefendantInterface;
}

export const DefendantProfile = ({ defendant }: DefendantProfileProps) => {
	return (
		<Flex
			minW={'auto'}
			gap={1}
			p={10}
			borderRadius={20}
			bgColor={colors.deepNavy}
			justifyContent="center"
		>
			<VStack spacing={10}>
				<VStack alignItems={'left'}>
					<DefendantCardText
						field={'First Name'}
						value={defendant.firstName}
					/>
					<DefendantCardText
						field={'Last Name'}
						value={defendant.lastName}
					/>
					{defendant.phoneNumber && (
						<DefendantCardText
							field={'Phone'}
							value={defendant.phoneNumber}
						/>
					)}
					{defendant.email && (
						<DefendantCardText
							field={'Email'}
							value={defendant.email}
						/>
					)}
					<DefendantCardText
						field={'Meeting Type'}
						value={defendant.meetingType}
					/>
				</VStack>
				<Center>
					<Button>Edit</Button>
				</Center>
			</VStack>
		</Flex>
	);
};
