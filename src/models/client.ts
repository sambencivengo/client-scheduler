import { model, Schema } from 'mongoose';
import { ClientInterface } from '../types/Client';
import { MeetingType } from '../types';

// Schema
export const clientSchema = new Schema<ClientInterface>({
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
	lawyer: { type: Schema.Types.ObjectId, ref: 'Lawyer', required: true },
});

// Model
export const Client = model<ClientInterface>('Client', clientSchema);
