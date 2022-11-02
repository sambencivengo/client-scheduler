import { Box, Center } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Defendants, Home } from './routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/defendants',
		element: <Defendants />,
	},
]);

const App = () => (
	<Box>
		<Center>
			<RouterProvider router={router} />
		</Center>
	</Box>
);

export default App;
