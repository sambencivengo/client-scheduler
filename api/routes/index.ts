import { Router } from 'express';
import { defendants } from '../controllers/defendants';
import { appointments } from './appointments';

export const api = Router();

api.use('/appointments', appointments);
api.use('/defendants', defendants);
