import { Router } from 'express';
import { get } from './get';
import { put } from './put';

export const defendantId = Router({ mergeParams: true });

defendantId.get('', get);
defendantId.put('', put);
