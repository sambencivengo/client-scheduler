import { Heading, VStack } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';
import { colors } from '../../theme';

interface ErrorAlertProps {
	error: AxiosError;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
	return (
		<VStack m={3} py={5} borderRadius={20} bgColor={colors.red}>
			<Heading>{error.name}</Heading>
			<Heading size="md">{error.code}</Heading>
			<Heading size="md">{error.message}</Heading>
		</VStack>
	);
};
