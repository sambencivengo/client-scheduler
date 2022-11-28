import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { CreateLawyer } from '../schema';
import { InputField } from '../components/InputField';
import axios from 'axios';

export const Register: React.FC = () => {
	return (
		<Box
			minWidth={{ base: 350, sm: 500 }}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={20}
		>
			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={{ email: '', password: '' }}
				validationSchema={CreateLawyer.uiSchema}
				onSubmit={async ({ email, password }, { setErrors }) => {
					try {
						const res = await axios.post('/api/lawyers', {
							email,
							password,
						});

						console.log(res.data);

						// if (!res.ok) {
						// 	console.log(res.statusText); // TODO: show error on FE
						// 	return;
						// }

						// const data = await res.json();

						// console.log(data);
					} catch (error) {
						console.log(error);
					}
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
