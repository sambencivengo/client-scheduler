import {
	Button,
	Center,
	Heading,
	HStack,
	useToast,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from '../../theme';
import { ErrorAlert, ErrorAlertProps } from '../ErrorAlert';

interface DeleteDefendantConfirmationProps {
	setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteDefendantConfirmation: React.FC<
	DeleteDefendantConfirmationProps
> = ({ setIsDeleting }) => {
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const { defendantId } = useParams();
	const toast = useToast();
	const navigate = useNavigate();

	const deleteDefendant = async () => {
		try {
			const res = await fetch(`/api/defendants/${defendantId}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			});
			if (!res.ok) {
				setRequestError({
					header: 'Unable to delete defendant',
					message: `${await res.text()} (Error Code: ${res.status})`,
				});
				return;
			}
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
			console.error(error);
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
			{requestError && <ErrorAlert {...requestError} />}
		</VStack>
	);
};
