import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Center,
	Text,
} from '@chakra-ui/react';
import { colors } from '../../theme';

export const NavBar = () => (
	<Box bgColor={colors.deepNavy} w={'100%'}>
		<Center>
			<Breadcrumb separator="/">
				<BreadcrumbItem>
					<BreadcrumbLink href={`/`}>
						<Text fontSize={'xl'}>Home</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href="/defendants">
						<Text fontSize={'xl'}>List</Text>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
		</Center>
	</Box>
);
