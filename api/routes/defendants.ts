import { Router } from 'express';
import API from '../controllers';

export const defendants = Router();

// TODO: appointments using calendly/outlook
defendants.post('', API.Defendants.createDefendant);
