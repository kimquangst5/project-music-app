import express from 'express';
import path from "../../config/system"

import dasboard from './dashboard.route'
import song from './song.route'
import songCategory from './song-category.route'
import upload from './upload.route'

export const index = (app: express.Express) => {
	const admin = path.admin
	app.use(`/${admin}/dashboard`, dasboard)
	app.use(`/${admin}/song`, song)
	app.use(`/${admin}/song-category`, songCategory)
	app.use(`/${admin}/upload-images`, upload)
};