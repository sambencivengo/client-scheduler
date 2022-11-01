import { Router } from 'express';
import { post } from './post';

export const defendants = Router({ mergeParams: true });

defendants.post('', post);
