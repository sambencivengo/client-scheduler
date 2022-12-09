import { Box } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DefendantInterface } from '../types/DefendantInterface';

export const Defendant: React.FC = () => {
	const { defendantId } = useParams();
	// const [defendant, setDefendant] = React.useState<DefendantInterface | null>(
	// 	null
	// );

	React.useEffect(() => {
		const getDefendant = async (): Promise<void> => {
			try {
				const res = await fetch(`/api/defendants/${defendantId}`);
				const data = await res.json();
				console.log({ data });
			} catch (error) {
				console.error(error);
			}
		};

		getDefendant();
	}, [defendantId]);

	return <Box>Defendant ID route</Box>;
};
