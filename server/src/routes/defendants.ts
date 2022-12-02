import { Router } from 'express';
import { userMiddleWare } from '../middleware';

import API from '../controllers';

export const defendants = Router();

defendants.use(userMiddleWare);

defendants.post('', API.Defendants.post);
defendants.get('', API.Defendants.get);
