import { model, Schema } from 'mongoose';
import { LawyerInterface } from 'src/types/Lawyer';

// Schema
export const lawyerSchema = new Schema<LawyerInterface>({
	email: { type: String, required: true }, // TODO: add email validation
	password: { type: String, required: true },
	defendants: [{ type: Schema.Types.ObjectId, ref: 'Defendant' }],
});

// Model
export const Lawyer = model<LawyerInterface>('Lawyer', lawyerSchema);
