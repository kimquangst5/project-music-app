import express from 'express';
import home from './home.route'
import topic from './topic.route'
import song from './songs.route'
import search from './search.route'

export const index = (app: express.Express) => {
	app.use('/', home)
	app.use('/topics', topic)
	app.use('/songs', song)
	app.use('/search', search)
};