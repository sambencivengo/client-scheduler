import { Center, Heading, Spinner, Flex, Box } from '@chakra-ui/react';
import { DefendantInterface } from '../../../shared/types';
import React from 'react';
import axios from 'axios';
import { DefendantCard } from '../components/DefendantCard';

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
