import { Router } from 'express';
import { createDefendant } from './createDefendant';

export const defendants = Router({ mergeParams: true });

defendants.post('', createDefendant);
