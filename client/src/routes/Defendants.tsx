import { Box, Text, VStack, Center, Heading, Spinner } from '@chakra-ui/react';
import { DefendantInterface } from '../../../shared/types';
import { phoneUtils } from '../../../shared/utils';
import React from 'react';
import axios from 'axios';
import { colors } from '../theme';

export const Defendants: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [defendants, setDefendants] = React.useState<DefendantInterface[]>(
		[]
	);

	const getDefendants = async (): Promise<void> => {
		try {
			const { data } = await axios.get(
				'http://localhost:8000/api/defendants'
			);
			console.log(data);

			setDefendants(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		getDefendants();
	}, []);

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<VStack bgColor={colors.navy} borderRadius={20} w={'100%'} h={'100%'}>
			<Heading>Defendants</Heading>
			<Box>
				{defendants.map((defendant) => (
					<>
						<Text>{defendant.firstName}</Text>
						<Text>{defendant.lastName}</Text>
						<Text>{defendant.phoneNumber}</Text>
						<Text>{defendant.email}</Text>
						<Text>{defendant.meetingType}</Text>
					</>
				))}
			</Box>
		</VStack>
	);
};
