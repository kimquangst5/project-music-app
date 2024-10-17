import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	try {
		const singers = await Singer.find({
			deleted: false
		})
		res.render("admin/pages/singer/index.pug", {
			pageTitle: "Danh sách ca sĩ",
			singers: singers
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

export const deleteSinger = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await Singer.updateOne({
			_id: id
		}, {
			deleted: true
		})
		res.redirect('back')
	} catch (error) {
		res.redirect('back')

	}
}

export const edit = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const singer = await Singer.findOne({
			_id: id,
			deleted: false
		})
		res.render('admin/pages/singer/edit.pug', {
			pageTitle: `Trang chỉnh sửa ca sĩ`,
			singer: singer
		})
	} catch (error) {
		res.redirect('back')
	}

}

export const editPatch = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await Singer.updateOne({
			_id: id,
			deleted: false
		}, req.body)
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}

}