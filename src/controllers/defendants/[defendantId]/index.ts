import { Router } from 'express';
import { get } from './get';
import { put } from './put';
import { destroy } from './destroy';

export const defendantId = Router({ mergeParams: true });

defendantId.get('', get);
defendantId.put('', put);
defendantId.delete('', destroy);
