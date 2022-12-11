import React from 'react';
import { Lawyer } from '../../types/Lawyer';
import { ErrorAlertProps } from '../ErrorAlert';

interface LawyerProviderProps {
	children: React.ReactNode;
}

interface LawyerContextData {
	isLoading: boolean;
	requestError: ErrorAlertProps | null;
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
	const [requestError, setRequestError] =
		React.useState<ErrorAlertProps | null>(null);

	const getMe = async (): Promise<void> => {
		try {
			const res = await fetch('/api/lawyers/me');
			if (!res.ok) {
				console.error(await res.text());
				setLawyer(null);
				setIsLoading(false);
				return;
			}
			const data = await res.json();
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
			await fetch(`/api/lawyers/logout`, { method: 'DELETE' });
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
			await fetch('/api/lawyers/login', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			setIsLoading(false);
			setRequestError(null);
			getMe();
			return true;
		} catch (error) {
			setRequestError({
				header: 'Unable to login',
				message: 'Encountered an error logging in',
			});
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
			await fetch('/api/lawyers', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					calendlyLink,
				}),
			});
			setIsLoading(false);
			getMe();
			return true;
		} catch (error) {
			setRequestError({
				header: 'An error occurred while registering account',
				message: 'Unable to create account. Please try again later',
			});
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
