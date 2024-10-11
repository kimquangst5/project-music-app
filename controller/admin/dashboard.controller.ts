import express, { Request, Response } from 'express'
import Topic from '../../models/topic.model'
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';

export const index = async (req: Request, res: Response) => {
	res.render("admin/pages/dashboard/index.pug", {
		pageTitle: "Trang tổng quan"
	})

}