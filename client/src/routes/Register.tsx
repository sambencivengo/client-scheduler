import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { CreateLawyer } from '../schema';
import { InputField } from '../components/InputField';

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
			>
				{({ isSubmitting }) => (
					<Form>
						<Flex flexDirection={'column'} gap={4}>
							<InputField name="email" label="Email" />
							<InputField
								name="password"
								label="Password"
								type="password"
							/>
						</Flex>
						<Button isLoading={isSubmitting} mt={4} type="submit">
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
