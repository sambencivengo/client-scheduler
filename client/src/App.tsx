import { Box, Center } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
	<Box m={100}>
		<Center>
			<RouterProvider router={router} />
		</Center>
	</Box>
);

export default App;
