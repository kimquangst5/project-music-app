import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	const topics = await Topic.find({
		deleted: false
	})
	res.render("admin/pages/song-category/index.pug", {
		pageTitle: "Chủ đề bài hát",
		topics: topics
	})
}