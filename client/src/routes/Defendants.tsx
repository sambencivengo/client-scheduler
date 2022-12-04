import {
	Center,
	Heading,
	Spinner,
	Flex,
	Box,
	useBreakpointValue,
	HStack,
	CloseButton,
} from '@chakra-ui/react';
import React from 'react';
import axios, { AxiosError } from 'axios';
import { DefendantCard } from '../components/DefendantCard';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { DefendantInterface } from '../types/DefendantInterface';
import { ErrorAlert } from '../components/ErrorAlert';
import dayjs from 'dayjs';
import { DefendantsTable } from '../components/DefendantsTable';

export const Defendants: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [defendants, setDefendants] = React.useState<DefendantInterface[]>(
		[]
	);
	const [requestError, setRequestError] = React.useState<AxiosError>();
	const isMobile = useBreakpointValue({ base: true, lg: false });

	const [startDate, setStartDate] = React.useState<Date | undefined>(
		dayjs().subtract(7, 'days').toDate() // Set start at 1 week ago
	);
	const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());

	React.useEffect(() => {
		const queryString = new URLSearchParams({
			dayOfContactStart: startDate
				? dayjs(startDate).format('YYYY-MM-DD')
				: '',
			dayOfContactEnd: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
		});
		console.log(queryString.toString());

		const getDefendants = async (): Promise<void> => {
			try {
				const { data } = await axios.get(
					`/api/defendants?${queryString.toString()}`
				);
				setDefendants(data);
				setIsLoading(false);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					setRequestError(error);
					setIsLoading(false);
					console.error(error);
				} else {
					console.error(error);
				}
			}
		};
		getDefendants();
	}, [startDate, endDate]);

	if (requestError) return <ErrorAlert error={requestError} />;

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<Flex direction={'column'} gap={10}>
			<Heading textAlign={'center'}>Defendants</Heading>
			<Flex
				justifyContent={'space-evenly'}
				flexDir={isMobile ? 'column' : 'row'}
				w="full"
				gap={3}
			>
				<Box>
					<Heading mb={3} textAlign="center" size="sm">
						Start Date
					</Heading>
					<HStack>
						<SingleDatepicker
							date={startDate}
							onDateChange={setStartDate}
						/>
					</HStack>
				</Box>
				<Box>
					<Heading mb={3} textAlign="center" size="sm">
						End Date
					</Heading>
					<HStack>
						<SingleDatepicker
							date={endDate}
							onDateChange={setEndDate}
						/>
					</HStack>
				</Box>
			</Flex>
			{isMobile ? (
				<Flex
					gap={5}
					borderRadius={20}
					w={'100%'}
					h={'100%'}
					justifyContent={'space-evenly'}
					wrap={'wrap'}
				>
					{defendants.map((defendant) => (
						<Box key={defendant._id}>
							<DefendantCard defendant={defendant} />
						</Box>
					))}
				</Flex>
			) : (
				<DefendantsTable defendants={defendants} />
			)}
		</Flex>
	);
};
