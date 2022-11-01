import { Router } from 'express';
import { appointments } from './appointments';
import { defendants } from './defendants';

export const api = Router();

api.use('/appointments', appointments);
api.use('/defendants', defendants);
