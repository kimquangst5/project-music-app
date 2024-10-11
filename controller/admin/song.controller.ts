import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

// [GET] /admin/song
export const index = async (req: Request, res: Response) => {
	try {
		const songs = await Song.find({
			deleted: false
		})

		for (const song of songs) {
			const singer = await Singer.findOne({
				_id: song.singerId
			})
			song['singerFullName'] = singer.fullName

			const topic = await Topic.findOne({
				_id: song.topicId
			})
			song['topicTitle'] = topic.title
		}
		res.render("admin/pages/song/index.pug", {
			pageTitle: "Danh sách bài hát",
			songs: songs
		})
	} catch (error) {
		res.redirect('back')
	}

}

// [GET] /admin/song/create
export const create = async (req: Request, res: Response) => {
	try {
		const topics = await Topic.find({
			deleted: false,
			status: 'active'
		})

		const singers = await Singer.find({
			deleted: false,
			status: 'active'
		})
		res.render("admin/pages/song/create.pug", {
			pageTitle: "Thêm bài hát",
			topics: topics,
			singers: singers
		})
	} catch (error) {
		res.redirect('back')
	}

}


// [POST] /admin/song/create
export const createPost = async (req: Request, res: Response) => {
	const data = {
		title: req.body.title,
		description: req.body.description,
		avatar: (req.body.avatar ? req.body.avatar[0] : ''),
		singerId: req.body.singer,
		topicId: req.body.topic,
		status: req.body.status,
		audio: (req.body.audio ? req.body.audio[0] : ''),
		lyrics: req.body.lyrics || ''
	}
	const newSong = new Song(data);
	await newSong.save();
	res.redirect('back')
}

// [GET] /admin/song/edit/:id
export const edit = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const song = await Song.findOne({
			_id: id
		})

		const topics = await Topic.find({
			deleted: false,
			status: 'active'
		})

		const singers = await Singer.find({
			deleted: false,
			status: 'active'
		})

		res.render('admin/pages/song/edit.pug', {
			song: song,
			topics: topics,
			singers: singers
		})
	} catch (error) {
	}

}

// [PATCH] /admin/song/edit/:id
export const editPatch = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = {
			title: req.body.title,
			description: req.body.description,
			avatar: (req.body.avatar ? req.body.avatar[0] : ''),
			singerId: req.body.singer,
			topicId: req.body.topic,
			status: req.body.status,
			audio: (req.body.audio ? req.body.audio[0] : ''),
			lyrics: req.body.lyrics || ''
		}
		await Song.updateOne({
			_id: id
		}, {
			title: req.body.title,
			description: req.body.description,
			avatar: (req.body.avatar[0] ? req.body.avatar[0] : ''),
			singerId: req.body.singer,
			topicId: req.body.topic,
			status: req.body.status,
			audio: (req.body.audio[0] ? req.body.audio[0] : ''),
			lyrics: (req.body.lyrics ? req.body.lyrics : ''),
		})
		res.redirect('back')
	} catch (error) {
		res.redirect('back')
	}
}