import { MeetingType } from './MeetingType';

// TODO: Find efficient way to use the shared package to prevent react errors
export interface DefendantInterface {
	_id: number;
	firstName: string;
	lastName: string;
	email?: string;
	phoneNumber?: string;
	dayOfContact: Date;
	meetingType: MeetingType;
}
