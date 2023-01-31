import {
	Flex,
	Text,
	useBreakpointValue,
	Center,
	Select,
	Button,
	FormControl,
	FormLabel,
	VStack,
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetClient } from '../../schema';
import { ClientInterface } from '../../types/ClientInterface';
import { MeetingType } from '../../types/MeetingType';
import { ErrorAlertProps } from '../ErrorAlert';
import { InputField } from '../InputField';

interface ClientQueryFilterProps {
	setClients: React.Dispatch<React.SetStateAction<ClientInterface[]>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setRequestError: React.Dispatch<
		React.SetStateAction<ErrorAlertProps | null>
	>;
}

interface FetchClientsProps {
	dayOfContactStart: Date | string;
	dayOfContactEnd: Date | string;
	meetingType?: MeetingType;
	clientName?: string;
}

export const ClientQueryFilter: React.FC<ClientQueryFilterProps> = ({
	setClients,
	setIsLoading,
	setRequestError,
}) => {
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const [startDate, setStartDate] = React.useState<Date>(
		new Date(
			dayjs().subtract(7, 'days').toDate() // Set start at 1 week ago
		)
	);

	const [endDate, setEndDate] = React.useState<Date>(new Date());
	const navigate = useNavigate();

	const fetchClients = async ({
		clientName,
		dayOfContactEnd,
		meetingType,
		dayOfContactStart,
	}: FetchClientsProps) => {
		const queryString = new URLSearchParams({
			dayOfContactStart: dayOfContactStart
				? dayjs(dayOfContactStart).format('YYYY-MM-DD')
				: '',
			dayOfContactEnd: dayOfContactEnd
				? dayjs(dayOfContactEnd).format('YYYY-MM-DD')
				: '',
			meetingType: meetingType ?? '',
			clientName: clientName ?? '',
		});

		try {
			setIsLoading(true);

			const res = await fetch(`/api/clients?${queryString.toString()}`);

			if (!res.ok) {
				setRequestError({
					header: 'Error fetching clients',
					message: `Unable to get clients. (Error Code: ${res.status})`,
				});
				if (res.status === 403) {
					navigate('/');
				}
				setIsLoading(false);
				return;
			}
			const clients = await res.json();
			setClients(clients);

			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	// React.useEffect(() => {
	// 	fetchClients({
	// 		dayOfContactStart: startDate,
	// 		dayOfContactEnd: endDate,
	// 	});
	// }, []);

	return (
		<React.Fragment>
			<Center>
				<Formik
					validateOnChange={false}
					validateOnBlur={false}
					initialValues={{
						dayOfContactStart: startDate.toDateString(),
						dayOfContactEnd: endDate.toDateString(),
						clientName: '',
						meetingType: undefined,
					}}
					validationSchema={GetClient.uiSchema}
					onSubmit={async ({
						clientName,
						dayOfContactStart,
						dayOfContactEnd,
						meetingType,
					}) => {
						fetchClients({
							clientName,
							dayOfContactStart,
							dayOfContactEnd,
							meetingType,
						});
					}}
				>
					{({ isSubmitting, handleChange, setFieldValue }) => (
						<Form>
							<VStack>
								<Flex
									justifyContent={'center'}
									flexDir={isMobile ? 'column' : 'row'}
									gap={3}
								>
									<FormControl id="dayOfContactStart">
										<FormLabel
											mb={3}
											textAlign="center"
											size="sm"
										>
											Start Date
										</FormLabel>

										<SingleDatepicker
											date={startDate}
											onDateChange={(date) => {
												setStartDate(date);
												setFieldValue(
													'dayOfContactStart',
													date
												);
											}}
										/>
									</FormControl>

									<FormControl id="dayOfContactEnd">
										<FormLabel
											mb={3}
											textAlign="center"
											size="sm"
										>
											End Date
										</FormLabel>

										<SingleDatepicker
											date={endDate}
											onDateChange={(date) => {
												setEndDate(date);
												setFieldValue(
													'dayOfContactEnd',
													date
												);
											}}
										/>
									</FormControl>

									<FormControl id="meetingType">
										<FormLabel
											mb={3}
											textAlign="center"
											size="sm"
										>
											Meeting Type
										</FormLabel>
										<Select
											onChange={handleChange}
											placeholder="Select option"
										>
											<option
												value={MeetingType.InPerson}
											>
												{MeetingType.InPerson}
											</option>
											<option value={MeetingType.Phone}>
												{MeetingType.Phone}
											</option>
										</Select>
									</FormControl>
								</Flex>

								<Center>
									<InputField name="clientName" />
								</Center>
								<Button isLoading={isSubmitting} type="submit">
									Search
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
			</Center>

			<Text textAlign="center" opacity={0.6} as="i">
				Date range will default to the last 7 days
			</Text>
		</React.Fragment>
	);
};
