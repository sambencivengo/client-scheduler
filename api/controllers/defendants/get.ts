import { Handler } from 'express';

export const get: Handler = async (req, res) => {
	res.send('get defendants hooked up');
};
