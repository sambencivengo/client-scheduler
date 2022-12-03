import {
	Text,
	Flex,
	Link,
	Center,
	Spinner,
	Menu,
	MenuButton,
	Button,
	MenuItem,
	MenuList,
	useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { colors } from '../../theme';

interface Lawyer {
	email: string;
	id: string;
}

export const NavBar = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [lawyer, setLawyer] = React.useState<Lawyer>();
	const isMobile = useBreakpointValue({ base: true, lg: false });

	const getMe = async () => {
		try {
			const { data } = await axios.get('/api/lawyers/me');
			setLawyer(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error(error);
		}
	};

	React.useEffect(() => {
		getMe();
	}, []);

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

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
			{!lawyer ? (
				<Flex gap={3} ml="auto">
					<Link href="/register">Register</Link>
					<Link href="/login">Login</Link>
				</Flex>
			) : (
				<React.Fragment>
					<Flex gap={3}>
						<Link href="/">Home</Link>
						<Link href="/defendants">Defendants</Link>
					</Flex>
					{navType}
				</React.Fragment>
			)}
		</Flex>
	);
};
