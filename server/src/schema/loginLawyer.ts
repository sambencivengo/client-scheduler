import * as yup from 'yup';

const schema = yup.object({
	email: yup
		.string()
		.trim()
		.email('Email must be a valid email address')
		.required('Please enter an your email address'),
	password: yup.string().trim().required('Please enter your password'),
});

export type UiValues = yup.InferType<typeof uiSchema>;
export const uiSchema = schema.clone();

export type ApiValues = yup.InferType<typeof apiSchema>;
export const apiSchema = schema.clone();
