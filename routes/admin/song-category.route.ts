import express from 'express';
const router = express.Router();
import * as controller from '../../controller/admin/song-category.controller';
import multer from 'multer' // Nhúng multer
const upload = multer();// Khởi tạo multer
import { uploadSingle } from '../../middlewares/admin/uploadCloud.middlewares';
router.get(`/`, controller.index);

router.get(`/create`, controller.create);

router.post(
	`/create`,
	upload.single('avatar'),
	uploadSingle,
	controller.createPost
);

router.get(`/edit/:id`, controller.edit);

router.patch(
	`/edit/:id`,
	upload.single('avatar'),
	uploadSingle,
	controller.editPatch
);

router.get(
	`/delete/:id`,
	controller.deleteTopic
);


export default router
