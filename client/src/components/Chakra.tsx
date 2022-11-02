import {
	ChakraProps,
	ChakraProvider,
	localStorageManager,
} from '@chakra-ui/react';
import React from 'react';
import { theme } from '../theme';

export const Chakra: React.FC<ChakraProps & { children: React.ReactNode }> = ({
	children,
}) => {
	const colorCodeManager = localStorageManager;

	return (
		<ChakraProvider theme={theme} colorModeManager={colorCodeManager}>
			{children}{' '}
		</ChakraProvider>
	);
};
