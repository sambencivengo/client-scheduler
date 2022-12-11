import {
	Button,
	Center,
	Heading,
	HStack,
	useToast,
	VStack,
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from '../../theme';
import { ErrorAlert } from '../ErrorAlert';

interface DeleteDefendantConfirmationProps {
	setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteDefendantConfirmation: React.FC<
	DeleteDefendantConfirmationProps
> = ({ setIsDeleting }) => {
	const [requestError, setRequestError] = React.useState<AxiosError | null>(
		null
	);
	const { defendantId } = useParams();
	const toast = useToast();
	const navigate = useNavigate();

	const deleteDefendant = async () => {
		try {
			await axios.delete(`/api/defendants/${defendantId}`);
			toast({
				description: `Defendant successfully deleted from the database`,
				status: 'success',
				variant: 'solid',
				duration: 4000,
				isClosable: true,
				containerStyle: { background: colors.navy },
				position: 'top',
			});
			navigate('/defendants');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setRequestError(error as AxiosError);
				console.error(error);
			} else {
				console.error(error);
			}
		}
	};

	return (
		<VStack
			gap={3}
			maxW={400}
			p={5}
			bgColor={colors.navy}
			borderRadius={25}
		>
			<Heading textAlign="center" size="sm">
				Are you sure you want to delete this record?
			</Heading>
			<Center>
				<HStack>
					<Button onClick={() => setIsDeleting(false)}>Back</Button>
					<Button onClick={deleteDefendant} bgColor={colors.red}>
						Confirm Delete
					</Button>
				</HStack>
			</Center>
			{requestError && <ErrorAlert error={requestError} />}
		</VStack>
	);
};
