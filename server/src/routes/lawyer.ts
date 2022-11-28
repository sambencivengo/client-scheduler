import { Router } from 'express';
import API from '../controllers';

export const lawyers = Router();

lawyers.post('', API.Lawyers.post);
