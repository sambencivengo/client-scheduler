import { Box, Text, Button, Heading, VStack, chakra } from '@chakra-ui/react';
import React from 'react';
import { useLawyer } from '../components/LawyerProvider';
import { colors } from '../theme';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
	const { lawyer } = useLawyer();

	return (
		<Box
			minWidth={{ base: 350, sm: 500 }}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={2}
		>
			<VStack gap={5}>
				<Heading size="lg" textAlign="center">
					Welcome!
				</Heading>
				<VStack maxW={600}>
					<Text fontSize={'20px'}>
						This application is a simple client management tool for
						public defenders. If this is your first time, click the{' '}
						<chakra.span fontWeight={800} as="i">
							New Client
						</chakra.span>{' '}
						button below or use the navigation bar to add a new
						client. Once you have added clients, they will be
						available under the{' '}
						<chakra.span fontWeight={800} as="i">
							Clients
						</chakra.span>{' '}
						tab in the navigation bar. From there you will be able
						to query records of your clients and filter based
						first-contact date and the meeting type that was chosen.
					</Text>
					{/* TODO: profile for Lawyers to edit email/calendly link */}
					<Text fontSize={'20px'}>
						If you provided a correct Calendly link when
						registering, Clients should be able to easily schedule
						appointments with you after entering their information
						into the application.
					</Text>
				</VStack>

				<Button>
					{lawyer ? (
						<Link to={'/clients/new'}>New Client</Link>
					) : (
						<Link to={'/clients/new'}>New Client</Link>
					)}
				</Button>
			</VStack>
		</Box>
	);
};
