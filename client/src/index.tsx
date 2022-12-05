import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LawyerProvider } from './components/LawyerProvider/LaywerProvider';
import { theme } from './theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<LawyerProvider>
				<App />
			</LawyerProvider>
		</ChakraProvider>
	</React.StrictMode>
);
