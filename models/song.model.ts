import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

const songsSchema = new mongoose.Schema({
	title: String,
	description: String,
	avatar: String,
	singerId: String,
	topicId: String,
	like: {
		type: Number,
		default: 0
	},
	listen: {
		type: Number,
		default: 0
	},
	lyrics: String,
	audio: String,
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

const Song = mongoose.model('Song', songsSchema, 'songs');

export default Song;