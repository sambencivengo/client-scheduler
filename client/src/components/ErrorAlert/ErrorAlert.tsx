import { Heading, VStack, Text } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';
import { colors } from '../../theme';

interface ErrorAlertProps {
	error: AxiosError;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
	return (
		<VStack m={3} py={5} borderRadius={20} bgColor={colors.red}>
			<Heading size={'md'}>{error.response?.statusText}:</Heading>
			<Text>Status Code: {error.response?.status}</Text>

			<Heading size="md">{error.response!.status ?? ''}</Heading>
		</VStack>
	);
};
