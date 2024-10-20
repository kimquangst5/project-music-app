import express, { Request, Response } from 'express'
import unidecode from "unidecode"
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	try {
		const { type } = req.params
		let { key }: any = req.query;

		let keySlug = key.trim().replace(/\s+/g, '-')
		keySlug = unidecode(keySlug)

		let regexTitle = new RegExp(key, 'i');
		let regexSlug = new RegExp(keySlug, 'i');

		const songs = await Song.find({
			$or: [
				{ title: regexTitle },
				{ slug: regexSlug }
			],
			deleted: false,
			status: 'active'
		})

		let songsFinal = [];
		for (const song of songs) {
			const singer = await Singer.findOne({
				_id: song.singerId
			})
			if (singer) {
				let items = {
					title: song.title,
					avatar: song.avatar,
					slug: song.slug,
					singer: singer.fullName
				}
				songsFinal.push(items)
			}


		}

		if (type == 'result') {
			res.render("client/pages/songs/search.pug", {
				key: key,
				songs: songs
			})
		}
		else if (type == 'suggest') {
			res.json({
				code: 200,
				songs: songsFinal
			})
		}
	} catch (error) {
		res.redirect('back')
	}


}