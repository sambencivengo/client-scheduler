import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Calendar } from '../components/Calendar';
import { DefendantForm } from '../components/DefendantForm';
import { useLawyer } from '../components/LawyerProvider';
import { Login } from './Login';

export const Home: React.FC = () => {
	const { lawyer } = useLawyer();
	const [showDefendantForm, setShowDefendantForm] = React.useState(true);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');

	if (!lawyer) {
		return <Login />;
	}

	return (
		<Flex id="home" direction={'column'} gap={10}>
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
				{showDefendantForm ? ( // TODO: eventual /api/me route, render Register form or defendant form
					<DefendantForm
						setShowDefendantForm={setShowDefendantForm}
						setName={setName}
						setEmail={setEmail}
					/>
				) : (
					<Calendar name={name} email={email} />
				)}
			</Flex>
		</Flex>
	);
};
