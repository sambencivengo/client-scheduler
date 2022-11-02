import { VStack, Center, Heading, Spinner } from '@chakra-ui/react';
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
		<VStack
			// bgColor={colors.greyBlue} //TODO: change bg color?
			borderRadius={20}
			w={'100%'}
			h={'100%'}
		>
			<Heading>Defendants</Heading>
			{defendants.map((defendant) => (
				<DefendantCard defendant={defendant} />
			))}
		</VStack>
	);
};
