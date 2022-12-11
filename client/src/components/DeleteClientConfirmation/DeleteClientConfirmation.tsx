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

interface DeleteClientConfirmationProps {
	setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteClientConfirmation: React.FC<
	DeleteClientConfirmationProps
> = ({ setIsDeleting }) => {
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const { clientId } = useParams();
	const toast = useToast();
	const navigate = useNavigate();

	const deleteClient = async () => {
		try {
			const res = await fetch(`/api/clients/${clientId}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
				},
			});
			if (!res.ok) {
				setRequestError({
					header: 'Unable to delete client',
					message: `${await res.text()} (Error Code: ${res.status})`,
				});
				return;
			}
			toast({
				description: `Client successfully deleted from the database`,
				status: 'success',
				variant: 'solid',
				duration: 4000,
				isClosable: true,
				containerStyle: { background: colors.navy },
				position: 'top',
			});
			navigate('/clients');
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
					<Button onClick={deleteClient} bgColor={colors.red}>
						Confirm Delete
					</Button>
				</HStack>
			</Center>
			{requestError && <ErrorAlert {...requestError} />}
		</VStack>
	);
};
