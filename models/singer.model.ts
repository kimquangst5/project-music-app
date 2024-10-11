import mongoose from 'mongoose';
const { Schema } = mongoose;

const singerSchema = new Schema({
	fullName: String,
	avatar: String,
	description: String,
	status: String,
	slug: String,
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: Date
}, {
	timestamps: true
})

const Singer = mongoose.model('Singer', singerSchema, 'singers');

export default Singer;