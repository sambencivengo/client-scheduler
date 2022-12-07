import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Calendar } from '../components/Calendar';
import { DefendantForm } from '../components/DefendantForm';
import { HomePage } from '../components/HomePage';
import { useLawyer } from '../components/LawyerProvider';
import { Login } from './Login';

export const Home: React.FC = () => {
	const { lawyer } = useLawyer();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');

	if (!lawyer) {
		return <Login />;
	}

	return (
		<Flex id="home" direction={'column'} gap={10}>
			<Flex
				gap={5}
				// bgColor={colors.greyBlue} //TODO: change bg color?
				borderRadius={20}
				w={'100%'}
				h={'100%'}
				justifyContent={'space-evenly'}
				wrap={'wrap'}
			>
				<HomePage />
			</Flex>
		</Flex>
	);
};
