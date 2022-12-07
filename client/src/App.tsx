import { Box, Center } from '@chakra-ui/react';
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
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
		errorElement: <ErrorPage />,
	},
	{
		path: '/defendants',
		element: <Defendants />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/register',
		element: <Register />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <ErrorPage />,
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
