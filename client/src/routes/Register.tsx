import { Box, Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../theme';
import { Form, Formik } from 'formik';
import { CreateLawyer } from '../schema';
import { InputField } from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';
import { useLawyer } from '../components/LawyerProvider';

export const Register: React.FC = () => {
	const navigate = useNavigate();
	const { register, isLoading, requestError } = useLawyer();

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
			<Heading textAlign="center">Register</Heading>
			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={{ email: '', password: '', calendlyLink: '' }}
				validationSchema={CreateLawyer.uiSchema}
				onSubmit={async ({ email, password, calendlyLink }) => {
					console.log(email, password, calendlyLink);

					const success = await register({
						email,
						password,
						calendlyLink,
					});
					if (success) {
						navigate('/');
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
							<InputField
								name="calendlyLink"
								label="Calendly Link"
							/>
						</Flex>
						<Button isLoading={isSubmitting} mt={4} type="submit">
							Register
						</Button>
					</Form>
				)}
			</Formik>
			{requestError && <ErrorAlert error={requestError} />}
		</Box>
	);
};
