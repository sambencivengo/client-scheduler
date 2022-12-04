import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { CreateLawyer } from '../schema';
import { InputField } from '../components/InputField';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';

export const Login: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [requestError, setRequestError] = React.useState<AxiosError>();
	const navigate = useNavigate();

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
				validationSchema={CreateLawyer.uiSchema}
				onSubmit={async ({ email, password }) => {
					try {
						await axios.post('/api/lawyers/login', {
							email,
							password,
						});
						setIsLoading(true);
						navigate('/');
						setRequestError(undefined);
					} catch (error) {
						setRequestError(error as AxiosError);
						setIsLoading(false);
						console.error(error);
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
							Login
						</Button>
					</Form>
				)}
			</Formik>
			{requestError && <ErrorAlert error={requestError} />}
		</Box>
	);
};
