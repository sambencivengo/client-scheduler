import dayjs from 'dayjs';

export const validateDate = (value: Date | string | undefined) => {
	if (value === undefined) return true;
	return dayjs(value).isValid();
};
