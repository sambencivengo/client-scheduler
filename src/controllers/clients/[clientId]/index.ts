import { Router } from 'express';
import { get } from './get';
import { put } from './put';
import { destroy } from './destroy';

export const clientId = Router({ mergeParams: true });

clientId.get('', get);
clientId.put('', put);
clientId.delete('', destroy);
