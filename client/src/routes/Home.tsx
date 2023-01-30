import { Box } from '@chakra-ui/react';
import React from 'react';
import { useLawyer } from '../components/LawyerProvider';
import { colors } from '../theme';
import { LawyerInfo, NewUserInfo } from '../components/HomePageInfo';

export const Home: React.FC = () => {
	const { lawyer } = useLawyer();

	return (
		<Box
			minWidth={{ base: 350, sm: 500 }}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={2}
		>
			{lawyer ? <LawyerInfo /> : <NewUserInfo />}
		</Box>
	);
};
