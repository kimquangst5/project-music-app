import express from 'express';
const router = express.Router();
import * as controller from '../../controller/client/song.controller';

router.get(`/:slug`, controller.index);

router.get(`/detail/:slug`, controller.detail);

router.patch(`/detail/change-like`, controller.changeLike);

router.patch(`/change-listen`, controller.changeListen);


export default router
