import { Handler } from 'express';

export const post: Handler = (req, res) => {
	console.log(req.body);

	res.send('defendant post');
};
