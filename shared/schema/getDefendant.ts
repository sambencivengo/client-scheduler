import * as yup from 'yup';
import { MeetingType } from '../types';

const schema = yup.object({
	dayOfContact: yup
		.string()
		.trim()
		.test('dayOfContact', 'Please enter a valid date', () => true),
});
