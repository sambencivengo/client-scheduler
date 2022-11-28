import { Center, Heading, Spinner, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import axios, { AxiosError } from 'axios';
import { DefendantCard } from '../components/DefendantCard';
import { DefendantInterface } from '../types/DefendantInterface';
import { ErrorAlert } from '../components/ErrorAlert';

export const Defendants: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [defendants, setDefendants] = React.useState<DefendantInterface[]>(
		[]
	);
	const [requestError, setRequestError] = React.useState<AxiosError>();

	const getDefendants = async (): Promise<void> => {
		try {
			const { data } = await axios.get('/api/defendants');
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

	if (requestError) return <ErrorAlert error={requestError} />;

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<Flex direction={'column'} gap={10}>
			<Heading textAlign={'center'}>Defendants</Heading>
			<Flex
				gap={5}
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
