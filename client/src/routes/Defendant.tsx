import { Button, Center, Spinner, VStack } from '@chakra-ui/react';
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
				setIsLoading(true);
				const res = await fetch(`/api/defendants/${defendantId}`);
				if (!res.ok) {
					setIsLoading(false);
					setRequestError({
						header: 'Error fetching Defendant',
						message: `${await res.text()} (Error Code: ${
							res.status
						})`,
					});
				}
				const data = (await res.json()) as DefendantInterface;
				setDefendant(data);
				setIsLoading(false);
			} catch (error) {
				setRequestError({
					header: `An error while getting defendant`,
					message:
						'We were unable to get defendant, please try again',
				});
				setIsLoading(false);
				console.error(error);
			}
		};

		getDefendant();
	}, [defendantId]);

	if (requestError && !isLoading) return <ErrorAlert {...requestError} />;

	if (!defendant || isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<VStack spacing={9}>
			<DefendantProfile selectedDefendant={defendant} />
			<Link to={'/defendants'}>
				<Button>Back to Defendants</Button>
			</Link>
		</VStack>
	);
};
