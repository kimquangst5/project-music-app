import express from 'express';
const router = express.Router();
import * as controller from '../../controller/admin/trash.controller';
import * as uploadCloud from '../../middlewares/admin/uploadCloud.middlewares'
import multer from 'multer';

const upload = multer()

router.get(`/song`, controller.song);

router.get(`/song/restore/:id`, controller.songRestore);

router.get(`/song/delete/:id`, controller.songDelete);

router.get(`/topic`, controller.topic);

router.get(`/topic/restore/:id`, controller.topicRestore);

router.get(`/topic/delete/:id`, controller.topicDelete);

router.get(`/singer`, controller.singer);

router.get(`/singer/restore/:id`, controller.singerRestore);

router.get(`/singer/delete/:id`, controller.singerDelete);


export default router
