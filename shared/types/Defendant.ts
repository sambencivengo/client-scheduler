import { MeetingType } from './meetingType';

export interface DefendantInterface {
	_id: number;
	firstName: string;
	lastName: string;
	email?: string;
	phoneNumber?: string;
	dayOfContact: Date;
	meetingType: MeetingType;
}
