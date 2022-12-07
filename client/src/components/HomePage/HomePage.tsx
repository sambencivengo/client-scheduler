import { Box, Center, Flex, Heading, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';
import { useLawyer } from '../LawyerProvider';

export const HomePage: React.FC = () => {
	const { lawyer } = useLawyer();
	return (
		<VStack gap={5} p={10}>
			<Heading>Welcome {lawyer?.email}!</Heading>
			<Image src="/Seal_of_Colorado.png" width={'30%'} />
		</VStack>
	);
};
