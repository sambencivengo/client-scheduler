import { Router } from 'express';
import API from '../controllers';

export const lawyers = Router();

lawyers.use('/me', API.Lawyers.me);

lawyers.post('', API.Lawyers.post);
lawyers.post('/login', API.Lawyers.login);
