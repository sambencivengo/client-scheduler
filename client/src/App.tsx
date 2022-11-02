import { Box, Center } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import ErrorPage from './ErrorPage';
import { Defendants, Home } from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/defendants',
		element: <Defendants />,
	},
]);

const App = () => (
	<>
		<NavBar />
		<Box m={100}>
			<Center>
				<RouterProvider router={router} />
			</Center>
		</Box>
	</>
);

export default App;
