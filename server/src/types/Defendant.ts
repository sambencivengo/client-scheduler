import { MeetingType } from './MeetingType';

export interface DefendantInterface {
	_id: number;
	firstName: string;
	lastName: string;
	email?: string;
	phoneNumber?: string;
	dayOfContact: Date;
	meetingType: MeetingType;
}
