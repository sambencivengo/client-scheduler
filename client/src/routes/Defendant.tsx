import { Box, Center, Spinner } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';
import { DefendantInterface } from '../types/DefendantInterface';

export const Defendant: React.FC = () => {
	const { defendantId } = useParams();
	const [isLoading, setIsLoading] = React.useState(false);
	const [requestError, setRequestError] = React.useState<AxiosError>();
	const [defendant, setDefendant] = React.useState<DefendantInterface | null>(
		null
	);

	React.useEffect(() => {
		const getDefendant = async (): Promise<void> => {
			try {
				const { data } = await axios.get(
					`/api/defendants/${defendantId}`,
					{
						withCredentials: true,
					}
				);

				setDefendant(data);
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

		getDefendant();
	}, [defendantId]);

	if (!defendant || isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}
	if (requestError) return <ErrorAlert error={requestError} />;

	return <Box>Defendant ID route</Box>;
};
