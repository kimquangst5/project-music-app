import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import * as cloud from '../../middlewares/admin/uploadCloud.middlewares';

// [GET] /admin/song
export const song = async (req: Request, res: Response) => {
	try {
		const songs = await Song.find({
			deleted: true
		})
		res.render("admin/pages/trash/song.pug", {
			pageTitle: "Danh sách bài hát",
			songs: songs
		})
	} catch (error) {

	}

}

export const songRestore = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await Song.updateOne({
			_id: id
		}, {
			deleted: false
		})
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}

}

export const songDelete = async (req: Request, res: Response) => {
	try {
		// await Song.deleteOne({
		// 	_id: req.params.id
		// })
		const { id } = req.params
		const song = await Song.findOne({
			_id: id
		})
		let avatar = song.avatar.split("/")
		let nameImage = avatar[avatar.length - 1].split('.')[0]
		let audio = song.audio.split("/")
		let nameAudio = audio[audio.length - 1].split('.')[0]

		cloud.deleteSingle(nameImage)
		cloud.deleteSingle(nameAudio)
		await Song.deleteOne({
			_id: id
		})
		res.redirect('back')

	} catch (error) {
		res.redirect('back')
	}
	
}

export const topic = async (req: Request, res: Response) => {
	try {
		const topics = await Topic.find({
			deleted: true
		})
		res.render("admin/pages/trash/topic.pug", {
			pageTitle: "Danh sách thể loại bài hát",
			topics: topics
		})
	} catch (error) {

	}

}

export const topicRestore = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await Topic.updateOne({
			_id: id
		}, {
			deleted: false
		})
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}

}

export const topicDelete = async (req: Request, res: Response) => {
	try {
		// await Song.deleteOne({
		// 	_id: req.params.id
		// })
		const { id } = req.params
		const topic = await Topic.findOne({
			_id: id
		})
		let avatar = topic.avatar.split("/")
		let nameImage = avatar[avatar.length - 1].split('.')[0]

		cloud.deleteSingle(nameImage)
		await Topic.deleteOne({
			_id: id
		})
		res.redirect('back')

	} catch (error) {
		res.redirect('back')
	}
	
}

export const singer = async (req: Request, res: Response) => {
	try {
		const singers = await Singer.find({
			deleted: true
		})
		res.render("admin/pages/trash/singer.pug", {
			pageTitle: "Danh sách thể loại bài hát",
			singers: singers
		})
	} catch (error) {

	}

}

export const singerRestore = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await Singer.updateOne({
			_id: id
		}, {
			deleted: false
		})
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}

}

export const singerDelete = async (req: Request, res: Response) => {
	try {
		// await Song.deleteOne({
		// 	_id: req.params.id
		// })
		const { id } = req.params
		const singer = await Singer.findOne({
			_id: id
		})
		let avatar = singer.avatar.split("/")
		let nameImage = avatar[avatar.length - 1].split('.')[0]

		cloud.deleteSingle(nameImage)
		await Singer.deleteOne({
			_id: id
		})
		res.redirect('back')

	} catch (error) {
		res.redirect('back')
	}
	
}