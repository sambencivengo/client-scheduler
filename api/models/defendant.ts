import { model } from 'mongoose';
import { DefendantInterFace, defendantSchema } from '../schema';

export const Defendant = model<DefendantInterFace>(
	'Defendant',
	defendantSchema
);
