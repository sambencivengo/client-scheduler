import {
	Text,
	Flex,
	Link,
	Menu,
	MenuButton,
	Button,
	MenuItem,
	MenuList,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';
import { useLawyer } from '../LawyerProvider';

export const NavBar = () => {
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const { lawyer } = useLawyer();

	const mobileMenu = () => (
		<Flex marginLeft={'auto'}>
			<Menu>
				<MenuButton as={Button}>Menu</MenuButton>
				<MenuList>
					<MenuItem>
						<Text>{lawyer?.email}</Text>
					</MenuItem>
					<MenuItem>
						<Link>Logout</Link>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);

	const navType = isMobile ? (
		mobileMenu()
	) : (
		<Flex gap={3} ml="auto">
			<Text>{lawyer?.email}</Text>
			<Link>Logout</Link>
		</Flex>
	);

	// TODO: fix and switch to a flex with various links
	return (
		<Flex p={5} bgColor={colors.deepNavy} w={'100%'}>
			{lawyer ? (
				<React.Fragment>
					<Flex gap={3}>
						<Link href="/">Home</Link>
						<Link href="/defendants">Defendants</Link>
					</Flex>
					{navType}
				</React.Fragment>
			) : (
				<Flex gap={3} ml="auto">
					<Link href="/register">Register</Link>
					<Link href="/login">Login</Link>
				</Flex>
			)}
		</Flex>
	);
};
