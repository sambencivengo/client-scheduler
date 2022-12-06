import { Handler } from 'express';

export const logout: Handler = (req, res) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) {
				res.status(400).send('Unable to log out');
			} else {
				res.send('Logout successful');
			}
		});
	} else {
		res.end();
	}
};
