import {
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
import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme';
import { useLawyer } from '../LawyerProvider';

export const NavBar = () => {
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const { lawyer, logout } = useLawyer();
	const navigate = useNavigate();

	const logoutFunc = async () => {
		const success = await logout();
		if (success) {
			navigate('/login');
		}
	};

	const navType = isMobile ? (
		<Flex marginLeft={'auto'}>
			<Menu>
				<MenuButton as={Button}>Menu</MenuButton>
				<MenuList>
					<MenuItem>
						<Button onClick={() => navigate('/')}>
							{lawyer?.email}
						</Button>
					</MenuItem>
					<MenuItem>
						<Button onClick={logoutFunc}>Logout</Button>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	) : (
		<Flex gap={3} ml="auto">
			<Link href="/">{lawyer?.email}</Link>
			<Link onClick={logoutFunc}>Logout</Link>
		</Flex>
	);

	// TODO: fix and switch to a flex with various links
	return (
		<Flex p={5} bgColor={colors.deepNavy} w={'100%'}>
			{lawyer ? (
				<React.Fragment>
					<Flex gap={3}>
						<Link href="/defendantForm">Form</Link>
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
