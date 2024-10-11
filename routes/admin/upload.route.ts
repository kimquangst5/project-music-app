import express from 'express';
const router = express.Router();
import * as controller from '../../controller/admin/upload.controller';
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middlewares'

import multer from 'multer';
const upload = multer()

router.post(
	`/`,
	upload.single('file'),
	uploadCloud.uploadSingle,
	controller.index
);


export default router
