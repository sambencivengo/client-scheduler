import { Box, Center } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DefendantForm } from './components/DefendantForm';
import { NavBar } from './components/NavBar';
import ErrorPage from './ErrorPage';
import { Defendants, Home, Login, Register } from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/defendantForm',
		element: <DefendantForm />,
	},
	{
		path: '/defendants',
		element: <Defendants />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

const App = () => (
	<>
		<NavBar />
		<Box mt={10} mb={50} mx={20}>
			<Center>
				<RouterProvider router={router} />
			</Center>
		</Box>
	</>
);

export default App;
