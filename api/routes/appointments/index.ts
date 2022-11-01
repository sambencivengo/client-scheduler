import { Router } from 'express';
import { post } from './post';

export const appointments = Router({ mergeParams: true });

appointments.post('', post);
