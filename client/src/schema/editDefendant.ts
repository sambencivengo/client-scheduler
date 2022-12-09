import * as yup from 'yup';
import { MeetingType } from '../types/MeetingType';
import { phoneUtils } from '../utils';

const validatePhoneNumber = (value?: string) => {
	return value === undefined ? true : phoneUtils.validatePhoneNumber(value);
};

const schema = yup.object({
	firstName: yup.string().trim(),
	lastName: yup.string().trim(),
	email: yup.string().email('Email must be a valid email').trim(),
	phoneNumber: yup
		.mixed()
		.test(
			'phoneNumber',
			'Please enter a valid phone number',
			validatePhoneNumber
		),
	meetingType: yup.mixed<MeetingType>().oneOf(Object.values(MeetingType)),
	// .required('Meeting type is required'),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
