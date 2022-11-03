import { Router } from 'express';
import API from '../controllers';

export const defendants = Router();

defendants.post('', API.Defendants.post);
defendants.get('', API.Defendants.get);
