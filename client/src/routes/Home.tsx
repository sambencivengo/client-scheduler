import { Flex, Heading } from '@chakra-ui/react';
import { DefendantForm } from '../components/DefendantForm';

export const Home: React.FC = () => (
	<Flex direction={'column'} gap={10}>
		<Heading textAlign={'center'}>Form</Heading>
		<Flex
			gap={5}
			// bgColor={colors.greyBlue} //TODO: change bg color?
			borderRadius={20}
			w={'100%'}
			h={'100%'}
			justifyContent={'space-evenly'}
			wrap={'wrap'}
		>
			<DefendantForm />
		</Flex>
	</Flex>
);
