import { Schema } from 'mongoose';

export interface LawyerInterface {
	_id: number;
	email: string;
	password: string;
	calendlyLink: string;
	clients: Schema.Types.ObjectId[];
}
