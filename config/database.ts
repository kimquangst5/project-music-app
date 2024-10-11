import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export const connect = async () => {
	try {
		await mongoose.connect(process.env.database)
		console.log(`Kết nối database thành công!`);
	} catch (error) {
		// console.log(error);
		console.log(`Kết nối database thất bại!`);
	}
};