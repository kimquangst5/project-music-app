import { Request, Response } from 'express'
import Singer from '../../models/singer.model'
import Song from '../../models/song.model'
import Topic from '../../models/topic.model'

// [GET] /songs/:slug
export const index = async (req: Request, res: Response) => {
	try {
		const { slug } = req.params
		const topic = await Topic.findOne({
			slug: slug,
			deleted: false
		})

		const songs = await Song.find({
			status: 'active',
			deleted: false,
			topicId: topic?.id
		})
		for (const it of songs) {
			const singer = await Singer.findOne({
				_id: it.singerId
			})
			it['singer'] = singer.fullName
		}
		res.render(`client/pages/songs/index.pug`, {
			songs: songs
		})
	} catch (error) {
		console.log(error);

	}

}

// [GET] /songs/detail/:slug
export const detail = async (req: Request, res: Response) => {
	try {
		const { slug } = req.params
		const song = await Song.findOne({
			slug: slug
		})
		const singer = await Singer.findOne({
			_id: song.singerId
		})
		song['singer'] = singer.fullName

		const topic = await Topic.findOne({
			_id: song.topicId
		})
		song['topic'] = topic.title
		song['topicSlug'] = topic.slug
		res.render(`client/pages/songs/detail.pug`, {
			song: song
		})
	} catch (error) {
		console.log(error)
	}

}

// [PATCH] /songs/detail/change-like
export const changeLike = async (req: Request, res: Response) => {
	try {
		const { id, liked } = req.body
		await Song.updateOne({
			_id: id
		}, {
			like: parseInt(liked)
		})
		res.json({
			code: 200,
			message: parseInt(liked)
		})
	} catch (error) {
		res.json({
			code: 400,
		})
	}

}

// [PATCH] /songs/change-listen
export const changeListen = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		const song = await Song.findOne({
			_id: id
		})
		await Song.updateOne({
			_id: id
		}, {
			listen: song.listen + 1
		})
		const songNew = await Song.findOne({
			_id: id
		})
		res.json({
			code: 200,
			numberOfListen: songNew.listen
		})
	} catch (error) {
		res.json({
			code: 400
		})
	}

}

