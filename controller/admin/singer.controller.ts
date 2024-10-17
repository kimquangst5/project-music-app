import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	try {
		res.render("admin/pages/singer/index.pug", {
			pageTitle: "Danh sách ca sĩ"
		})
	} catch (error) {
		res.redirect('back')
	}


}

export const create = async (req: Request, res: Response) => {
	try {
		res.render("admin/pages/singer/create.pug", {
			pageTitle: "Thêm ca sĩ"
		})
	} catch (error) {
		res.redirect('back')
	}


}

export const createPost = async (req: Request, res: Response) => {

	try {
		const newSinger = new Singer(req.body);
		await newSinger.save();
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}

}