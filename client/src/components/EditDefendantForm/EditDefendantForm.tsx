import {
	Flex,
	Center,
	VStack,
	HStack,
	Button,
	Box,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react';
import { EditDefendant } from '../../schema';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';
import { MeetingType } from '../../types/MeetingType';
import { ErrorAlert, ErrorAlertProps } from '../ErrorAlert';
import { DefendantProfileEditField } from './DefendantProfileEditField';

interface EditDefendantFormProps {
	defendant: DefendantInterface;
	setDefendant: React.Dispatch<React.SetStateAction<DefendantInterface>>;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditDefendantForm: React.FC<EditDefendantFormProps> = ({
	defendant,
	setDefendant,
	setIsEditing,
}) => {
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const toast = useToast();
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
				const res = await fetch(`/api/defendants/${_id}`, {
					method: 'PUT',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({
						firstName,
						lastName,
						phoneNumber,
						email,
						meetingType,
					}),
				});

				if (!res.ok) {
					setRequestError({
						header: 'Error submitting form',
						message: `Unable to edit defendant. (Error Code: ${res.status})`,
					});
					return;
				}

				setDefendant(await res.json());
				toast({
					description: 'Defendant updated',
					status: 'success',
					variant: 'solid',
					duration: 4000,
					isClosable: true,
					containerStyle: { background: colors.navy },
					position: 'top',
				});
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
							<VStack>
								<HStack mt={4}>
									<Button onClick={() => setIsEditing(false)}>
										Back
									</Button>
									<Button
										isLoading={isSubmitting}
										bgColor={'green'}
										type={'submit'}
									>
										Save
									</Button>
								</HStack>
							</VStack>
						</Center>
						<Center>
							{requestError && <ErrorAlert {...requestError} />}
						</Center>
					</Box>
				</Form>
			)}
		</Formik>
	);
};
