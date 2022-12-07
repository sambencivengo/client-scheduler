import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLawyer } from '../LawyerProvider';

export const HomePage: React.FC = () => {
	const { lawyer } = useLawyer();
	return (
		<VStack gap={5} p={10}>
			<Heading size="md" textAlign="center">
				Welcome {lawyer?.email}!
			</Heading>
		</VStack>
	);
};
