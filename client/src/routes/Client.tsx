import { Button, Center, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClientProfile } from '../components/ClientProfile';
import { ErrorAlert, ErrorAlertProps } from '../components/ErrorAlert';
import { ClientInterface } from '../types/ClientInterface';

export const Client: React.FC = () => {
	const { clientId } = useParams();
	const [isLoading, setIsLoading] = React.useState(false);
	const [requestError, setRequestError] = React.useState<ErrorAlertProps>();
	const [client, setClient] = React.useState<ClientInterface | null>(null);

	React.useEffect(() => {
		const getClient = async (): Promise<void> => {
			try {
				setIsLoading(true);
				const res = await fetch(`/api/clients/${clientId}`);
				if (!res.ok) {
					setIsLoading(false);
					setRequestError({
						header: 'Error fetching Client',
						message: `${await res.text()} (Error Code: ${
							res.status
						})`,
					});
				}
				const data = (await res.json()) as ClientInterface;
				setClient(data);
				setIsLoading(false);
			} catch (error) {
				setRequestError({
					header: `An error while getting client`,
					message: 'We were unable to get client, please try again',
				});
				setIsLoading(false);
				console.error(error);
			}
		};

		getClient();
	}, [clientId]);

	if (requestError && !isLoading) return <ErrorAlert {...requestError} />;

	if (!client || isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<VStack spacing={9}>
			<ClientProfile selectedClient={client} />
			<Link to={'/clients'}>
				<Button>Back to Clients</Button>
			</Link>
		</VStack>
	);
};
