import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Calendar } from '../components/Calendar';
import { DefendantForm } from '../components/DefendantForm';

export const Home: React.FC = () => {
	const [showDefendantForm, setShowDefendantForm] = React.useState(true);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');

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
				{showDefendantForm ? (
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
