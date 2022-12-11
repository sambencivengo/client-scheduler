import { Heading, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';

export interface ErrorAlertProps {
	header: string;
	message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ header, message }) => {
	return (
		<VStack m={3} py={5} borderRadius={20} bgColor={colors.red}>
			<Heading size={'md'}>{header}:</Heading>
			<Text> {message}</Text>
		</VStack>
	);
};
