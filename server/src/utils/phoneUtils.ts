import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

export const phoneUtils = {
	validatePhoneNumber: (value?: string) =>
		isValidPhoneNumber(value ?? '', 'US'),
	formatNational: (value?: string) =>
		parsePhoneNumber(value ?? '').formatNational(),
	formatInternational: (value?: string) =>
		parsePhoneNumber(`+1${value}` ?? '').formatInternational(),
};
