import {
	Center,
	Heading,
	Spinner,
	Flex,
	Box,
	useBreakpointValue,
	Button,
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

	const [dayOfContactStart, setDayOfContactStart] = React.useState<
		Date | undefined
	>(
		dayjs().subtract(7, 'days').toDate() // Set start at 1 week ago
	);
	const [dayOfContactEnd, setDayOfContactEnd] = React.useState<
		Date | undefined
	>(new Date());

	const query = {
		dayOfContactStart: dayOfContactStart
			? dayjs(dayOfContactStart).format('YYYY-MM-DD')
			: '',
		dayOfContactEnd: dayOfContactEnd
			? dayjs(dayOfContactEnd).format('YYYY-MM-DD')
			: '',
	};
	const queryString = new URLSearchParams(query);

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

	// React.useEffect(() => {
	// 	getDefendants();
	// }, []);

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
							date={dayOfContactStart}
							onDateChange={setDayOfContactStart}
						/>
						<CloseButton />
					</HStack>
				</Box>
				<Box>
					<Heading mb={3} textAlign="center" size="sm">
						End Date
					</Heading>
					<HStack>
						<SingleDatepicker
							date={dayOfContactEnd}
							onDateChange={setDayOfContactEnd}
						/>

						<CloseButton />
					</HStack>
				</Box>
			</Flex>
			<Center>
				<Button onClick={() => getDefendants()}>Update Query</Button>
			</Center>
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
