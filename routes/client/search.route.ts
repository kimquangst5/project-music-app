import express from 'express';
const router = express.Router();
import * as controller from '../../controller/client/search.controller';

router.get(`/:type`, controller.index);

export default router
