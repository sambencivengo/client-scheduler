import {
	Button,
	Center,
	Flex,
	VStack,
	Box,
	Heading,
	HStack,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik'; // <== this correct import
import React from 'react';
import { EditDefendant } from '../../schema';
import { colors } from '../../theme';
import { DefendantInterface } from '../../types/DefendantInterface';
import { DefendantCardText } from '../DefendantCard/DefendantCardText';

import { DefendantProfileEditField } from './DefendantProfileEditField';

interface DefendantProfileProps {
	defendant: DefendantInterface;
}

export const DefendantProfile = ({ defendant }: DefendantProfileProps) => {
	const [isEditing, setIsEditing] = React.useState<boolean>(false);
	const [isConfirming, setIsConfirming] = React.useState<boolean>(false);
	const { firstName, lastName, phoneNumber, email, meetingType } = defendant;

	if (isEditing) {
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
					console.log({
						firstName,
						lastName,
						phoneNumber,
						email,
						meetingType,
					});
				}}
			>
				{({ isSubmitting }) => (
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
													Clicking "Confirm" will
													update this record in the
													database.
												</Heading>
												<HStack>
													<Button
														onClick={() =>
															setIsConfirming(
																false
															)
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
								)}
							</Center>
						</Box>
					</Form>
				)}
			</Formik>
		);
	}

	return (
		<Flex
			minW={'auto'}
			gap={1}
			p={10}
			borderRadius={20}
			bgColor={colors.deepNavy}
			justifyContent="center"
		>
			<VStack spacing={10}>
				<VStack alignItems={'left'}>
					<DefendantCardText
						field={'First Name'}
						value={defendant.firstName}
					/>
					<DefendantCardText
						field={'Last Name'}
						value={defendant.lastName}
					/>
					{defendant.phoneNumber && (
						<DefendantCardText
							field={'Phone'}
							value={defendant.phoneNumber}
						/>
					)}
					{defendant.email && (
						<DefendantCardText
							field={'Email'}
							value={defendant.email}
						/>
					)}
					<DefendantCardText
						field={'Meeting Type'}
						value={defendant.meetingType}
					/>
				</VStack>
				<Center>
					<Button onClick={() => setIsEditing(true)}>Edit</Button>
				</Center>
			</VStack>
		</Flex>
	);
};
