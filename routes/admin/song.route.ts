import express from 'express';
const router = express.Router();
import * as controller from '../../controller/admin/song.controller';
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middlewares'
import multer from 'multer';

const upload = multer()

router.get(`/`, controller.index);

router.get(`/create`, controller.create);

router.post(
	`/create`,
	upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
	uploadCloud.uploadMulti,
	controller.createPost);

router.get(`/edit/:id`, controller.edit);

router.patch(
	`/edit/:id`,
	upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
	uploadCloud.uploadMulti,
	controller.editPatch
);

router.get(`/delete/:id`, controller.deleteSong);



export default router
