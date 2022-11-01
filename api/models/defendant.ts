import { model, Schema } from 'mongoose';
export interface DefendantInterFace {
	name: string;
	email?: string;
	phoneNumber?: number;
	dayOfContact: Date;
}

// Schema
export const defendantSchema = new Schema<DefendantInterFace>({
	name: { type: String, required: true },
	email: { type: String, required: false },
	phoneNumber: { type: Number, required: false },
	dayOfContact: { type: Date, default: new Date() },
});

// Model
export const Defendant = model<DefendantInterFace>(
	'Defendant',
	defendantSchema
);
