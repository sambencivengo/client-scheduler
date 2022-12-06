import mongoose from 'mongoose';

export const connectDb = (url: string) => {
	mongoose.set('strictQuery', false);
	return mongoose.connect(url);
};
