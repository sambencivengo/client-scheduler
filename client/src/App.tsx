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
		<Box mt={10} mb={50} mx={20}>
			<Center>
				<RouterProvider router={router} />
			</Center>
		</Box>
	</>
);

export default App;
