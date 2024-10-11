import express from 'express';
const router = express.Router();
import * as controller from '../../controller/admin/song.-category.controller';

router.get(`/`, controller.index);

export default router
