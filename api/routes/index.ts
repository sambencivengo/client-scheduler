import { Router } from 'express';
import { appointments } from './appointments';

export const api = Router();

api.use('/appointments', appointments);
