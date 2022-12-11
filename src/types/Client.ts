import { Schema } from 'mongoose';
import { MeetingType } from './MeetingType';

export interface ClientInterface {
	_id: number;
	firstName: string;
	lastName: string;
	email?: string;
	phoneNumber?: string;
	dayOfContact: Date;
	meetingType: MeetingType;
	lawyer: Schema.Types.ObjectId;
}
