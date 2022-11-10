import * as yup from 'yup';
import { MeetingType } from '../types';
import { validateDate } from '../utils';

const schema = yup.object({
	dayOfContactStart: yup
		.string()
		.trim()
		.test('dayOfContact', 'Please enter a valid date', validateDate),
	dayOfContactEnd: yup
		.string()
		.trim()
		.test('dayOfContact', 'Please enter a valid date', validateDate),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
