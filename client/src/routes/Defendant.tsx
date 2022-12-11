import { Button, Center, Spinner, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { DefendantProfile } from '../components/DefendantProfile';
import { ErrorAlert, ErrorAlertProps } from '../components/ErrorAlert';
import { DefendantInterface } from '../types/DefendantInterface';

export const Defendant: React.FC = () => {
	const { defendantId } = useParams();
	const [isLoading, setIsLoading] = React.useState(false);
	const [requestError, setRequestError] = React.useState<ErrorAlertProps>();
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
					setRequestError({
						header: 'Unable to retrieve defendant',
						message: 'Unable to retrieve defendant',
					});
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
	if (requestError) return <ErrorAlert {...requestError} />;

	return (
		<VStack spacing={9}>
			<DefendantProfile selectedDefendant={defendant} />
			<Link to={'/defendants'}>
				<Button>Back to Defendants</Button>
			</Link>
		</VStack>
	);
};
