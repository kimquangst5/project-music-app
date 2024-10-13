import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

const { Schema } = mongoose;
const topicSchema = new Schema({
	title: String,
	avatar: String,
	description: String,
	status: String,
	slug: { 
		type: String,
		slug: "title"
	},
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: Date
}, {
	timestamps: true
}).plugin(slug)

const Topic = mongoose.model('Topic', topicSchema, 'topics');

export default Topic;