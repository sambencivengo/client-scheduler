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
import { EditClient } from '../../schema';
import { colors } from '../../theme';
import { ClientInterface } from '../../types/ClientInterface';
import { MeetingType } from '../../types/MeetingType';
import { ErrorAlert, ErrorAlertProps } from '../ErrorAlert';
import { ClientProfileEditField } from './ClientProfileEditField';

interface EditClientFormProps {
	client: ClientInterface;
	setClient: React.Dispatch<React.SetStateAction<ClientInterface>>;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditClientForm: React.FC<EditClientFormProps> = ({
	client,
	setClient,
	setIsEditing,
}) => {
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);
	const toast = useToast();
	const { firstName, lastName, phoneNumber, email, meetingType, _id } =
		client;

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
			validationSchema={EditClient.uiSchema}
			onSubmit={async ({
				firstName,
				lastName,
				phoneNumber,
				email,
				meetingType,
			}) => {
				const res = await fetch(`/api/clients/${_id}`, {
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
						message: `Unable to edit client. (Error Code: ${res.status})`,
					});
					return;
				}

				setClient(await res.json());
				toast({
					description: 'Client updated',
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
							<ClientProfileEditField
								fieldLabel="First Name"
								fieldName={'firstName'}
							/>
							<ClientProfileEditField
								fieldLabel="Last Name"
								fieldName={'lastName'}
							/>
							<ClientProfileEditField
								fieldLabel="Number"
								fieldName={'phoneNumber'}
							/>
							<ClientProfileEditField
								fieldLabel="Email"
								fieldName={'email'}
							/>
							<Flex justifyContent={'space-between'}>
								<FormLabel>Meeting Type</FormLabel>
								<RadioGroup
									defaultValue={client.meetingType}
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
