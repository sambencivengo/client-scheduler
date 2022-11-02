import { model, Schema } from 'mongoose';
import { MeetingType } from '../../shared/types';
export interface DefendantInterFace {
	name: string;
	email?: string;
	phoneNumber?: number;
	meetingType: MeetingType;
	dayOfContact: Date;
}

// Schema
export const defendantSchema = new Schema<DefendantInterFace>({
	name: { type: String, required: true },
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
export const Defendant = model<DefendantInterFace>(
	'Defendant',
	defendantSchema
);
