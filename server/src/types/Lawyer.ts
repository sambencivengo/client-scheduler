import { Schema } from 'mongoose';

export interface LawyerInterface {
	_id: number;
	email: string;
	password: string;
	defendants: Schema.Types.ObjectId[];
}
