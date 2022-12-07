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
						<Button>
							<Link to={'/'}>{lawyer?.email}</Link>
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
			<Button>
				<Link to="/">{lawyer?.email}</Link>
			</Button>
			<Button onClick={logoutFunc}>Logout</Button>
		</Flex>
	);

	// TODO: fix and switch to a flex with various links
	return (
		<Flex p={5} bgColor={colors.deepNavy} w={'100%'}>
			{lawyer ? (
				<React.Fragment>
					<Flex gap={3}>
						<Button>
							<Link to="/defendant-form">Form</Link>
						</Button>
						<Button>
							<Link to="/defendants">Defendants</Link>
						</Button>
					</Flex>
					{navType}
				</React.Fragment>
			) : (
				<Flex gap={3} ml="auto">
					<Button>
						<Link to="/register">Register</Link>
					</Button>
					<Button>
						<Link to="/login">Login</Link>
					</Button>
				</Flex>
			)}
		</Flex>
	);
};
