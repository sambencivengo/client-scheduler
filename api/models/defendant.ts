import { model } from 'mongoose';
import { DefendantInterFace, defendantSchema } from '../schema';

const Defendant = model<DefendantInterFace>('Defendant', defendantSchema);
