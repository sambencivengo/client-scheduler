import { Router } from 'express';
import { userMiddleWare } from '../middleware';
import API from '../controllers';

export const clients = Router();

clients.use(userMiddleWare);

clients.post('', API.Clients.post);
clients.get('', API.Clients.get);
clients.use('/:clientId', API.Clients.clientId);
