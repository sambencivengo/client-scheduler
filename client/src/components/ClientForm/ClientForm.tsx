import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Stack,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { CreateClient } from '../../schema';
import { colors } from '../../theme';
import { ClientInterface } from '../../types/ClientInterface';
import { MeetingType } from '../../types/MeetingType';
import { Calendar } from '../Calendar';
import { ErrorAlert, ErrorAlertProps } from '../ErrorAlert';
import { useLawyer } from '../LawyerProvider';

export const ClientForm = () => {
	const [validateWhileTyping, setValidateWhileTyping] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [showCalendly, setShowCalendly] = React.useState(false);
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const { lawyer } = useLawyer();

	const toast = useToast();

	const formik = useFormik<CreateClient.UiValues>({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			meetingType: MeetingType.InPerson,
			phoneNumber: '',
		},
		validationSchema: CreateClient.uiSchema,
		validateOnBlur: validateWhileTyping,
		validateOnChange: validateWhileTyping,
		async onSubmit({
			firstName,
			lastName,
			email,
			phoneNumber,
			meetingType,
		}) {
			const payload = {
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				phoneNumber: phoneNumber?.trim(),
				email: email?.trim(),
				meetingType,
			};

			try {
				const res = await fetch('/api/clients', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({ ...payload }),
				});

				if (!res.ok) {
					setRequestError({
						header: 'Unable to submit form',
						message: `Unable to create client. (Error Code: ${res.status})`,
					});
					return;
				}
				const client = (await res.json()) as ClientInterface;

				setEmail(client.email ?? '');
				setName(`${client.firstName} ${client.lastName}`);

				toast({
					description: `Thank you ${firstName} ${lastName}, your form submission was successful!`,
					status: 'success',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					containerStyle: { background: colors.navy },
					position: 'top',
				});
				setShowCalendly(true);
			} catch (error) {
				console.error(error);
			}
		},
	});

	if (formik.submitCount && !validateWhileTyping) {
		setValidateWhileTyping(true);
	}

	if (showCalendly) {
		return (
			<Center>
				<Calendar
					name={name}
					email={email}
					calendlyLink={lawyer!.calendlyLink}
				/>
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
			<Flex flexDir={'column'}>
				<form
					onSubmit={formik.handleSubmit}
					onReset={formik.handleReset}
				>
					<FormControl isRequired id="firstName">
						<FormLabel>First Name</FormLabel>
						<Input
							id="firstName"
							defaultValue={formik.values.firstName}
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							isInvalid={!!formik.errors.firstName}
						/>
						<FormHelperText color={colors.warning}>
							{formik.errors.firstName}&nbsp;
						</FormHelperText>
					</FormControl>

					<FormControl isRequired id="lastName">
						<FormLabel>Last Name</FormLabel>
						<Input
							id="lastName"
							defaultValue={formik.values.lastName}
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							isInvalid={!!formik.errors.lastName}
						/>
						<FormHelperText color={colors.warning}>
							{formik.errors.lastName}&nbsp;
						</FormHelperText>
					</FormControl>

					<FormControl id="email">
						<FormLabel>Email</FormLabel>
						<Input
							id="email"
							defaultValue={formik.values.email}
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							isInvalid={!!formik.errors.email}
						/>
						<FormHelperText color={colors.warning}>
							{formik.errors.email}&nbsp;
						</FormHelperText>
					</FormControl>

					<FormControl id="phoneNumber">
						<FormLabel>Phone number</FormLabel>
						<Input
							id="phoneNumber"
							defaultValue={formik.values.phoneNumber}
							disabled={formik.isSubmitting}
							onChange={formik.handleChange}
							isInvalid={!!formik.errors.phoneNumber}
						/>
						<FormHelperText color={colors.warning}>
							{formik.errors.phoneNumber as string}&nbsp;
						</FormHelperText>
					</FormControl>

					<Flex justifyContent={'space-between'}>
						<FormLabel>Meeting Type</FormLabel>
						<RadioGroup
							onChange={(value: MeetingType) =>
								formik.setFieldValue('meetingType', value)
							}
							defaultValue={MeetingType.InPerson}
							id="meetingType"
						>
							<Stack spacing={5} direction="row">
								<Radio value={MeetingType.InPerson}>
									{MeetingType.InPerson}
								</Radio>
								<Radio value={MeetingType.Phone}>
									{MeetingType.Phone}
								</Radio>
							</Stack>
						</RadioGroup>
					</Flex>

					<Center>
						<VStack>
							<Button
								isLoading={formik.isSubmitting}
								mt={5}
								size="md"
								type="submit"
							>
								Submit
							</Button>
							{requestError && <ErrorAlert {...requestError} />}
						</VStack>
					</Center>
				</form>
			</Flex>
		</Box>
	);
};
