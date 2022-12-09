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
	logout: () => Promise<boolean>;
	register: (a: RegisterArgs) => Promise<boolean>;
}
interface LoginArgs {
	email: string;
	password: string;
}
interface RegisterArgs extends LoginArgs {
	calendlyLink: string;
}

const LawyerContext = React.createContext<LawyerContextData>({
	lawyer: null,
	isLoading: true,
	requestError: null,
	login: async () => false,
	logout: async () => false,
	register: async () => false,
});

export const LawyerProvider: React.FC<LawyerProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [lawyer, setLawyer] = React.useState<Lawyer | null>(null);
	const [requestError, setRequestError] = React.useState<AxiosError | null>(
		null
	);

	const getMe = async (): Promise<void> => {
		try {
			const { data } = await axios.get('/api/lawyers/me');
			setLawyer(data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setLawyer(null);
			setIsLoading(false);
		}
	};

	const logout = async (): Promise<boolean> => {
		try {
			await axios.delete(`/api/lawyers/logout`);
			getMe();
			return true;
		} catch (error) {
			console.error('error');
			return false;
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
			setIsLoading(false);
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

	const register = async ({
		email,
		password,
		calendlyLink,
	}: RegisterArgs) => {
		try {
			await axios.post('/api/lawyers', {
				email,
				password,
				calendlyLink,
			});
			setIsLoading(false);
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
			value={{ register, logout, lawyer, login, isLoading, requestError }}
		>
			{children}
		</LawyerContext.Provider>
	);
};

export const useLawyer = () => React.useContext(LawyerContext);
