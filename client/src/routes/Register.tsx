import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { CreateLawyer } from '../schema';
import { InputField } from '../components/InputField';

export const Register: React.FC = () => {
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
				onSubmit={async ({ email, password }, { setErrors }) => {
					const res = await fetch('/api/lawyers', {
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify({
							email,
							password,
						}),
					});

					console.log(res);
				}}
			>
				{(
					{ isSubmitting } // TODO: fix validation so that it only fires off on submission
				) => (
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
