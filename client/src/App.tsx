import { Box, Center } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefendantForm } from './components/DefendantForm';
import { NavBar } from './components/NavBar';
import { Defendants, Home, Login, Register } from './routes';

const App = () => (
	<>
		<BrowserRouter>
			<NavBar />
			<Box mt={10} mb={50} mx={20}>
				<Center>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/defendantForm"
							element={<DefendantForm />}
						/>
						<Route path="/defendants" element={<Defendants />} />
					</Routes>
				</Center>
			</Box>
		</BrowserRouter>
	</>
);

export default App;
