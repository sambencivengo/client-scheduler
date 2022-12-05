import axios, { AxiosError } from 'axios';
import React from 'react';
import { Lawyer } from '../../types/Lawyer';

interface LawyerProviderProps {
	children: React.ReactNode;
}

interface LawyerContextData {
	isLoading: boolean;
	requestError: AxiosError | null;
	lawyer: Lawyer | null;
	login: (a: LoginArgs) => Promise<boolean>;
}
interface LoginArgs {
	email: string;
	password: string;
}

const LawyerContext = React.createContext<LawyerContextData>({
	lawyer: null,
	isLoading: true,
	requestError: null,
	login: async () => false,
});

export const LawyerProvider: React.FC<LawyerProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [lawyer, setLawyer] = React.useState<Lawyer | null>(null);
	const [requestError, setRequestError] = React.useState<AxiosError | null>(
		null
	);

	const getMe = async () => {
		try {
			const { data } = await axios.get('/api/lawyers/me');
			setLawyer(data);
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		getMe();
	}, []);

	const login = async ({ email, password }: LoginArgs) => {
		try {
			await axios.post('/api/lawyers/login', {
				email,
				password,
			});
			setIsLoading(true);
			setRequestError(null);
			getMe();
			return true;
		} catch (error) {
			setRequestError(error as AxiosError);
			setIsLoading(false);
			console.error(error);
			return false;
		}
	};

	return (
		<LawyerContext.Provider
			value={{ lawyer, login, isLoading, requestError }}
		>
			{children}
		</LawyerContext.Provider>
	);
};

export const useLawyer = () => React.useContext(LawyerContext);
