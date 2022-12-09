import { Center, Flex, Spinner } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DefendantCardText } from '../components/DefendantCard/DefendantCardText';
import { ErrorAlert } from '../components/ErrorAlert';
import { colors } from '../theme';
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

	console.log(defendant);

	if (!defendant || isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}
	if (requestError) return <ErrorAlert error={requestError} />;

	return (
		<Flex
			flexDir={'column'}
			gap={5}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={25}
		>
			<DefendantCardText
				field={'First Name'}
				value={defendant.firstName}
			/>
			<DefendantCardText field={'Last Name'} value={defendant.lastName} />
			{defendant.phoneNumber && (
				<DefendantCardText
					field={'Phone Number'}
					value={defendant.phoneNumber}
				/>
			)}
			{defendant.email && (
				<DefendantCardText
					field={'Email Address'}
					value={defendant.email}
				/>
			)}
			<DefendantCardText
				field={'Meeting Type'}
				value={defendant.meetingType}
			/>
		</Flex>
	);
};
