import { Router } from 'express';
import { userMiddleWare } from '../middleware';
import API from '../controllers';

export const defendants = Router();

defendants.use(userMiddleWare);

defendants.post('', API.Defendants.post);
defendants.post('', API.Defendants.put);
defendants.get('', API.Defendants.get);
defendants.use('/:defendantId', API.Defendants.defendantId);
