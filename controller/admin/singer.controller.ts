import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	res.render("admin/pages/singer/index.pug", {
		pageTitle: "Danh sách ca sĩ"
	})

}

export const create = async (req: Request, res: Response) => {
	res.render("admin/pages/singer/create.pug", {
		pageTitle: "Thêm ca sĩ"
	})

}

export const createPost = async (req: Request, res: Response) => {
	
	console.log(req.body)
	const newSinger = new Singer(req.body);
	await newSinger.save();
	res.redirect('back')
}