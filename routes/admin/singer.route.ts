import express from 'express';
const router = express.Router();
import * as controller from '../../controller/admin/singer.controller';
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middlewares'
import multer from 'multer';

const upload = multer()

router.get(`/`, controller.index);

router.get(`/create`, controller.create);

router.post(
	`/create`,
	upload.single('avatar'),
	uploadCloud.uploadSingle,
	controller.createPost
);

router.get(`/edit/:id`, controller.edit);

router.patch(
	`/edit/:id`,
	upload.single('avatar'),
	uploadCloud.uploadSingle,
	controller.editPatch
);


router.get(`/delete/:id`, controller.deleteSinger);


export default router
