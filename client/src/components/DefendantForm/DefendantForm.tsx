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
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { CreateDefendant } from '../../schema';
import { colors } from '../../theme';

import { MeetingType } from '../../types/MeetingType';

export const DefendantForm: React.FC = () => {
	const [meetingTypeValue, setMeetingTypeValue] = React.useState<MeetingType>(
		MeetingType.InPerson
	);

	const formik = useFormik<CreateDefendant.UiValues>({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			meetingType: MeetingType.InPerson,
			phoneNumber: '',
		},
		validationSchema: CreateDefendant.uiSchema,
		// validateOnBlur: validateWhileTyping,
		// validateOnChange: validateWhileTyping,
		async onSubmit({
			firstName,
			lastName,
			email,
			phoneNumber,
			meetingType,
		}) {
			const payload = JSON.stringify({
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				phoneNumber: phoneNumber?.trim(),
				email: email?.trim(),
				meetingType,
			});

			const res = await axios.post(
				'http://localhost:8000/api/defendants'
			);
			console.log(res);
		},
	});

	return (
		<Box minWidth={500} bgColor={colors.deepNavy} p={10} borderRadius={20}>
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
						<FormHelperText color={colors.red}>
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
						<FormHelperText color={colors.red}>
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
						<FormHelperText color={colors.red}>
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
					</FormControl>

					<Center>
						<RadioGroup
							onChange={(val: MeetingType) =>
								setMeetingTypeValue(val)
							}
							value={meetingTypeValue}
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
