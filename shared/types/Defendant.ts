import { MeetingType } from './meetingType';

export interface DefendantInterface {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	dayOfContact: Date;
	meetingType: MeetingType;
}
