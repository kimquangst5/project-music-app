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

export const edit = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const topic = await Topic.findOne({
			_id: id,
			deleted: false
		})
		console.log(topic)
		res.render("admin/pages/topic/edit.pug", {
			pageTitle: "Chỉnh sửa thể loại",
			topic: topic
		})
	} catch (error) {
		res.redirect('back')
	}
}

export const editPatch = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		await Topic.updateOne({
			_id: id
		}, req.body)
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}
}

export const deleteTopic = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Topic.updateOne({
			_id: id
		}, {
			deleted: true
		})
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}
}