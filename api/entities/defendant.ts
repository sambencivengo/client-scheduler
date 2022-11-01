import { Schema } from 'mongoose';

interface Defendant {
	name: string;
	email?: string;
	phoneNumber?: number;
	dayOfContact: Date;
}

export const defendantSchema = new Schema<Defendant>({
	name: { type: String, required: true },
	email: { type: String, required: false },
	phoneNumber: { type: Number, required: false },
	dayOfContact: { type: Date, default: new Date() },
});
