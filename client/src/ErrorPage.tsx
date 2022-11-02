import { Box, VStack, Text, Heading } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';
import { colors } from './theme';

interface ErrorResponse {
	status: number;
	data?: string;
	message: string;
	statusText: string;
}
export default function ErrorPage() {
	const error = useRouteError() as ErrorResponse;
	console.error(error);

	return (
		<Box bgColor={colors.greyBlue} borderRadius={20} p={18}>
			<VStack>
				<Heading>Oops!</Heading>
				<Text>Sorry, an unexpected error has occurred.</Text>
				<Text>
					<i>{error.statusText || error.message}</i>
				</Text>
			</VStack>
		</Box>
	);
}
