import {
	Flex,
	Center,
	VStack,
	Heading,
	HStack,
	Button,
	Box,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import React from 'react';
import { EditDefendant } from '../../schema';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';
import { MeetingType } from '../../types/MeetingType';
import { DefendantProfileEditField } from './DefendantProfileEditField';

interface EditDefendantFormProps {
	defendant: DefendantInterface;
	setDefendant: React.Dispatch<React.SetStateAction<DefendantInterface>>;
	isConfirming: boolean;
	setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditDefendantForm: React.FC<EditDefendantFormProps> = ({
	defendant,
	isConfirming,
	setDefendant,
	setIsConfirming,
	setIsEditing,
}) => {
	const { firstName, lastName, phoneNumber, email, meetingType, _id } =
		defendant;

	return (
		<Formik
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={{
				firstName,
				lastName,
				phoneNumber,
				email,
				meetingType,
			}}
			validationSchema={EditDefendant.uiSchema}
			onSubmit={async ({
				firstName,
				lastName,
				phoneNumber,
				email,
				meetingType,
			}) => {
				const { data } = await axios.put(`/api/defendants/${_id}`, {
					firstName,
					lastName,
					phoneNumber,
					email,
					meetingType,
				});
				setDefendant(data);
				setIsConfirming(false);
				setIsEditing(false);
			}}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<Box
						minWidth={{ base: 350, sm: 500 }}
						bgColor={colors.deepNavy}
						p={10}
						borderRadius={20}
					>
						<Flex gap={4} flexDir={'column'}>
							<DefendantProfileEditField
								fieldLabel="First Name"
								fieldName={'firstName'}
							/>
							<DefendantProfileEditField
								fieldLabel="Last Name"
								fieldName={'lastName'}
							/>
							<DefendantProfileEditField
								fieldLabel="Number"
								fieldName={'phoneNumber'}
							/>
							<DefendantProfileEditField
								fieldLabel="Email"
								fieldName={'email'}
							/>
							<Flex justifyContent={'space-between'}>
								<FormLabel>Meeting Type</FormLabel>
								<RadioGroup
									defaultValue={defendant.meetingType}
									id="meetingType"
									onChange={(val) =>
										(values.meetingType =
											val as MeetingType)
									}
								>
									<Stack spacing={5} direction="row">
										<Radio
											name="meetingType"
											value={MeetingType.InPerson}
										>
											{MeetingType.InPerson}
										</Radio>
										<Radio
											name="meetingType"
											value={MeetingType.Phone}
										>
											{MeetingType.Phone}
										</Radio>
									</Stack>
								</RadioGroup>
							</Flex>
						</Flex>
						<Center>
							{isConfirming ? (
								<Box
									mt={5}
									borderRadius={25}
									p={5}
									bgColor={colors.navy}
								>
									<Center>
										<VStack>
											<Heading size={'sm'}>
												Clicking "Confirm" will update
												this record in the database.
											</Heading>
											<HStack>
												<Button
													onClick={() =>
														setIsConfirming(false)
													}
												>
													Back
												</Button>
												<Button
													isLoading={isSubmitting}
													bgColor={'green'}
													type={'submit'}
												>
													Confirm
												</Button>
											</HStack>
										</VStack>
									</Center>
								</Box>
							) : (
								<VStack>
									<HStack mt={4}>
										<Button
											onClick={() => setIsEditing(false)}
										>
											Back
										</Button>
										<Button
											mt={4}
											onClick={() =>
												setIsConfirming(true)
											}
										>
											Save
										</Button>
									</HStack>
								</VStack>
							)}
						</Center>
					</Box>
				</Form>
			)}
		</Formik>
	);
};
