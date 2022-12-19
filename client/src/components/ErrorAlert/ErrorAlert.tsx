import { Heading, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';

export interface ErrorAlertProps {
	header: string;
	message: string | JSX.Element[];
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ header, message }) => {
	return (
		<VStack m={3} p={5} borderRadius={2} bgColor={colors.red}>
			<Heading size={'md'}>{header}:</Heading>
			<Text>{message}</Text>
		</VStack>
	);
};
