import { Router } from 'express';
import API from 'src/controllers';

export const lawyers = Router();

lawyers.post('' /* TODO: lawyer post controllers*/);
lawyers.get(
	'',
	(req, res) =>
		res.send('in lawyers route') /* TODO: remove test route
);
