import { Box } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { CreateLawyer } from '../schema';

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
	return (
		<Box
			minWidth={{ base: 350, sm: 500 }}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={20}
		>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={CreateLawyer.uiSchema}
				onSubmit={async (values, { setErrors }) => {
					// const response = await TODO: fetch
					console.log(values);
				}}
			></Formik>
		</Box>
	);
};
