import { Center, Heading, Spinner, Flex, Box, VStack } from '@chakra-ui/react';
import { DefendantInterface } from '../../../shared/types';
import React from 'react';
import axios, { AxiosError } from 'axios';
import { DefendantCard } from '../components/DefendantCard';
import { colors } from '../theme';

export const Defendants: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [defendants, setDefendants] = React.useState<DefendantInterface[]>(
		[]
	);
	const [requestError, setRequestError] = React.useState<AxiosError>();

	const getDefendants = async (): Promise<void> => {
		try {
			const { data } = await axios.get(
				'http://localhost:8000/api/defendants'
			);
			setDefendants(data);
			setIsLoading(false);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setRequestError(error);
				setIsLoading(false);
				console.error(error);
			} else {
				console.error(error);
			}
		}
	};

	React.useEffect(() => {
		getDefendants();
	}, []);

	if (requestError) {
		return (
			<VStack m={90} p={10} borderRadius={20} bgColor={colors.red}>
				<Heading>{requestError.code}</Heading>
				<Heading size={'md'}>{requestError.message}</Heading>
			</VStack>
		);
	}

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	console.log(defendants);

	return (
		<Flex direction={'column'} gap={10}>
			<Heading textAlign={'center'}>Defendants</Heading>
			<Flex
				gap={10}
				// bgColor={colors.greyBlue} //TODO: change bg color?
				borderRadius={20}
				w={'100%'}
				h={'100%'}
				justifyContent={'space-evenly'}
				wrap={'wrap'}
			>
				{defendants.map((defendant) => (
					<Box key={defendant._id}>
						<DefendantCard defendant={defendant} />
					</Box>
				))}
			</Flex>
		</Flex>
	);
};
