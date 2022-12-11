import { Box, Center } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ClientForm } from './components/ClientForm';
import { NavBar } from './components/NavBar';
import { Client, Clients, Home, Login, Register } from './routes';

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

						<Route path="/clients" element={<Clients />} />
						<Route path="/clients/:clientId" element={<Client />} />
						<Route path="/clients/new" element={<ClientForm />} />
					</Routes>
				</Center>
			</Box>
		</BrowserRouter>
	</>
);

export default App;
