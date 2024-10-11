import mongoose from 'mongoose';
const { Schema } = mongoose;
const topicSchema = new Schema({
	title: String,
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

const Topic = mongoose.model('Topic', topicSchema, 'topics');

export default Topic;