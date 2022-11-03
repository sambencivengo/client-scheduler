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
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { CreateDefendant } from '../../schema';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';

import { MeetingType } from '../../types/MeetingType';

interface DefendantFormProps {
	setShowDefendantForm: React.Dispatch<React.SetStateAction<boolean>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const DefendantForm = ({
	setShowDefendantForm,
	setEmail,
	setName,
}: DefendantFormProps) => {
	const [validateWhileTyping, setValidateWhileTyping] = React.useState(false);

	const toast = useToast();

	const formik = useFormik<CreateDefendant.UiValues>({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			meetingType: MeetingType.InPerson,
			phoneNumber: '',
		},
		validationSchema: CreateDefendant.uiSchema,
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
				const res = await axios.post('/api/defendants', payload);
				const defendant = res.data as DefendantInterface;

				setEmail(defendant.email ?? '');
				setName(`${defendant.firstName} ${defendant.lastName}`);

				toast({
					description: `Thank you ${firstName} ${lastName}, your form submission was successful!`,
					status: 'success',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					containerStyle: { background: colors.navy },
					position: 'top',
				});

				setShowDefendantForm(false);
			} catch (error) {
				console.error(error);
				toast({
					description: 'Unable to submit form',
					status: 'error',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					containerStyle: {
						background: colors.warning,
					},
					position: 'top',
				});
			}
		},
	});

	if (formik.submitCount && !validateWhileTyping) {
		setValidateWhileTyping(true);
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
					<FormControl id="firstName">
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

					<FormControl id="lastName">
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

					<Center>
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
					</Center>

					<Center>
						<Button
							isLoading={formik.isSubmitting}
							mt={5}
							size="md"
							type="submit"
						>
							Submit
						</Button>
					</Center>
				</form>
			</Flex>
		</Box>
	);
};
