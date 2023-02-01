import * as yup from 'yup';
import dayjs from 'dayjs';
import { MeetingType } from '../types/MeetingType';

export const validateDate = (value: Date | string | undefined) => {
	if (value === undefined) return true;
	return dayjs(value).isValid();
};

const schema = yup.object({
	dayOfContactStart: yup
		.string()
		.trim()
		.test('dayOfContact', 'Please enter a valid date', validateDate),
	dayOfContactEnd: yup
		.string()
		.trim()
		.test('dayOfContact', 'Please enter a valid date', validateDate),
	meetingType: yup.mixed<MeetingType>().oneOf(Object.values(MeetingType)),
	firstName: yup.string().trim(),
	lastName: yup.string().trim(),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
