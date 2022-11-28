import { model, Schema } from 'mongoose';
import { DefendantInterface } from 'src/types';
import { MeetingType } from '../types';

// Schema
export const defendantSchema = new Schema<DefendantInterface>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: false },
	phoneNumber: { type: String, required: false },
	dayOfContact: { type: Date, default: new Date() },
	meetingType: {
		type: String,
		required: true,
		enum: Object.values(MeetingType),
	},
});

// Model
export const Defendant = model<DefendantInterface>(
	'Defendant',
	defendantSchema
);
