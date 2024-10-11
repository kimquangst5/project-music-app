import express from 'express';
const router = express.Router();
import * as controller from '../../controller/client/home.controller';

router.get(`/`, controller.index);

export default router
