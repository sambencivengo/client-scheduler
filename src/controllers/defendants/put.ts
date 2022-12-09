import { Handler } from 'express';

export const put: Handler = (req, res) => {
	console.log(req);
	res.send('Put endpoint');
};
