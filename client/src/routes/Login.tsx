import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { LoginLawyer } from '../schema';
import { InputField } from '../components/InputField';
import { ErrorAlert } from '../components/ErrorAlert';
import { useNavigate } from 'react-router-dom';
import { useLawyer } from '../components/LawyerProvider';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const { isLoading, login, requestError } = useLawyer();

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<Box
			minWidth={{ base: 350, sm: 500 }}
			bgColor={colors.deepNavy}
			p={10}
			borderRadius={20}
		>
			<Heading textAlign="center">Login</Heading>
			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={{ email: '', password: '' }}
				validationSchema={LoginLawyer.uiSchema}
				onSubmit={async (args) => {
					const success = await login(args);
					if (success) {
						navigate('/');
					}
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
							Login
						</Button>
					</Form>
				)}
			</Formik>
			{requestError && <ErrorAlert {...requestError} />}
		</Box>
	);
};
