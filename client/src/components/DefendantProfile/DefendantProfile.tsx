import { Button, Center, Flex, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';
import { BsPersonCircle } from 'react-icons/bs';
import { DefendantCardText } from '../DefendantCard/DefendantCardText';
import { EditDefendantForm } from '../EditDefendantForm';

interface DefendantProfileProps {
	selectedDefendant: DefendantInterface;
}

export const DefendantProfile = ({
	selectedDefendant,
}: DefendantProfileProps) => {
	const [defendant, setDefendant] =
		React.useState<DefendantInterface>(selectedDefendant);
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [isConfirming, setIsConfirming] = React.useState<boolean>(false);

	if (isEditing) {
		return (
			<EditDefendantForm
				defendant={defendant}
				isConfirming={isConfirming}
				setDefendant={setDefendant}
				setIsConfirming={setIsConfirming}
				setIsEditing={setIsEditing}
			/>
		);
	}

	return (
		<Flex
			minW={'auto'}
			gap={1}
			p={10}
			borderRadius={20}
			bgColor={colors.deepNavy}
			justifyContent="center"
		>
			<VStack spacing={8}>
				<BsPersonCircle size={50} />
				<VStack alignItems={'left'}>
					<DefendantCardText
						field={'First Name'}
						value={defendant.firstName}
					/>
					<DefendantCardText
						field={'Last Name'}
						value={defendant.lastName}
					/>
					<DefendantCardText
						field={'Day of Contact'}
						value={dayjs(defendant.dayOfContact).format(
							'MM/DD/YYYY'
						)}
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
					<Button onClick={() => setIsEditing(true)}>Edit</Button>
				</Center>
			</VStack>
		</Flex>
	);
};
