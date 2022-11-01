import * as yup from 'yup';
import { phoneUtils } from '../utils';

const validatePhoneNumber = (value?: string) =>
	phoneUtils.validatePhoneNumber(value);

const schema = yup.object({
	name: yup.string().trim().required('A name is required'),
	email: yup.string().email('Email must be a valid email').trim(),
	phoneNumber: yup
		.mixed()
		.test(
			'phoneNumber',
			'Please enter a valid phone number',
			validatePhoneNumber
		),
});
