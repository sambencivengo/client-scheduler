import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLawyer } from '../components/LawyerProvider';
import { colors } from '../theme';
import { Login } from './Login';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
	const { lawyer } = useLawyer();
	const navigate = useNavigate();
	if (!lawyer) {
		return <Login />;
	}

	return (
		<Box
			minWidth={{ base: 350, sm: 500 }}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={20}
		>
			<VStack gap={5}>
				<Heading size="lg" textAlign="center">
					Welcome, {lawyer?.email}!
				</Heading>
				<Button onClick={() => navigate('/defendantForm')}>
					New Defendant
				</Button>
			</VStack>
		</Box>
	);
};
