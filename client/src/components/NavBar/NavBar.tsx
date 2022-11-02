import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Center,
} from '@chakra-ui/react';

import { MdHome, MdPeople } from 'react-icons/md';
import { colors } from '../../theme';

export const NavBar = () => (
	<Box bgColor={colors.deepNavy} w={'100%'}>
		<Center>
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink href={`/`}>
						<MdHome size={'50px'} />
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href="/defendants">
						<MdPeople size={'50px'} />
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
		</Center>
	</Box>
);
