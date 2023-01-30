import {
	Heading,
	Text,
	VStack,
	chakra,
	Button,
	HStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const NewUserInfo: React.FC = () => {
	return (
		<VStack gap={5}>
			<Heading size="lg" textAlign="center">
				Welcome!
			</Heading>
			<VStack spacing={5} maxW={600}>
				<Text fontSize={'20px'}>
					This application is a simple client management tool for
					public defenders. It is meant to help manage the seemingly
					insurmountable quantity of clients on a public defender's by
					allowing an attorney to save records of their first contact
					with a client and then quickly schedule future meetings.
				</Text>
				<Text fontSize={'20px'}>
					If you don't have an account, click the{' '}
					<Link to={'/register'}>
						<chakra.span
							textDecor={'underline'}
							fontWeight={800}
							as="i"
						>
							Register
						</chakra.span>{' '}
					</Link>
					button below to create an account, or{' '}
					<Link to={'/register'}>
						<chakra.span
							textDecor={'underline'}
							fontWeight={800}
							as="i"
						>
							Login
						</chakra.span>{' '}
						with your credentials.
					</Link>
				</Text>
			</VStack>
			<HStack>
				<Button>
					<Link to={'/register'}>Register</Link>
				</Button>
				<Button>
					<Link to={'/login'}>Login</Link>
				</Button>
			</HStack>
		</VStack>
	);
};
