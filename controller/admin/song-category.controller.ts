import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	try {
		const topics = await Topic.find({
			deleted: false
		})
		res.render("admin/pages/topic/index.pug", {
			pageTitle: "Chủ đề bài hát",
			topics: topics
		})
	} catch (error) {
		res.redirect('back')
	}

}

export const create = async (req: Request, res: Response) => {
	try {
		res.render("admin/pages/topic/create.pug", {
			pageTitle: "Thêm thể loại"
		})
	} catch (error) {
		res.redirect('back')
	}


}

export const createPost = async (req: Request, res: Response) => {
	try {
		const newTopic = new Topic(req.body);
		await newTopic.save();
		res.redirect('back');
	} catch (error) {
		res.redirect('back');
	}
}