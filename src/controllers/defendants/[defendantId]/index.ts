import { Router } from 'express';
import { get } from './get';

export const defendantId = Router({ mergeParams: true });

defendantId.get('', get);
