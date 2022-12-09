import { Box } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';
import { InlineWidget } from 'react-calendly';
import { colors } from '../../theme';

interface CalendarProps {
	email: string;
	name: string;
	calendlyLink: string;
}

export const Calendar = ({ email, name, calendlyLink }: CalendarProps) => {
	const width = useBreakpointValue({ base: '400px', md: '800px' });

	const calendlyEmail = email === '' ? 'bekahotis@gmail.com' : email;

	return (
		<Box className="App" w={'100%'} h={'100%'}>
			<InlineWidget
				styles={{
					backgroundColor: colors.warning,
					width,
					height: '1000px',
				}}
				prefill={{
					email: `${calendlyEmail}`,
					name: `${name}`,
				}}
				url={calendlyLink} //TODO: ENV VARIABLE FOR CALENDAR NAME
			/>
		</Box>
	);
};
