import {
	Flex,
	Menu,
	MenuButton,
	Button,
	MenuItem,
	MenuList,
	useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
						<Link to={'/'}>
							<Button>{lawyer?.email}</Button>
						</Link>
					</MenuItem>
					<MenuItem>
						<Button onClick={logoutFunc}>Logout</Button>
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	) : (
		<Flex gap={3} ml="auto">
			<Link to="/">
				<Button>{lawyer?.email}</Button>
			</Link>

			<Button onClick={logoutFunc}>Logout</Button>
		</Flex>
	);

	return (
		<Flex p={5} bgColor={colors.deepNavy} w={'100%'}>
			{lawyer ? (
				<React.Fragment>
					<Flex gap={3}>
						<Link to="/defendants/new">
							<Button>New</Button>
						</Link>
						<Link to="/defendants">
							<Button>Defendants</Button>
						</Link>
					</Flex>
					{navType}
				</React.Fragment>
			) : (
				<Flex gap={3} ml="auto">
					<Link to="/register">
						<Button>Register</Button>
					</Link>
					<Link to="/login">
						<Button>Login</Button>
					</Link>
				</Flex>
			)}
		</Flex>
	);
};
