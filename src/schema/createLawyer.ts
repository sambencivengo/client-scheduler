import * as yup from 'yup';

const PASSWORD_LENGTH = 8;

const schema = yup.object({
	email: yup
		.string()
		.trim()
		.email('Email must be a valid email address')
		.required('An email address is required'),
	password: yup
		.string()
		.trim()
		.required('A password is required')
		.min(
			PASSWORD_LENGTH,
			`Password must be at least ${PASSWORD_LENGTH} characters long`
		),
	calendlyLink: yup
		.string()
		.trim()
		.required()
		.test(
			'calendlyLink',
			'Please enter a valid Calendy link',
			(val: string | undefined) => {
				return val!.includes('https://calendly.com/');
			}
		),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
