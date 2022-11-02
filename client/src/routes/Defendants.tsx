import { Box, Center, Spinner } from '@chakra-ui/react';
import { DefendantInterface } from '../../../shared/types';
import React from 'react';
import axios from 'axios';

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
		<>
			<Box>Defendants</Box>
			{defendants.map((defendant) => (
				<>
					<Box>{defendant.firstName}</Box>
					<Box>{defendant.lastName}</Box>
				</>
			))}
		</>
	);
};
