import { Router } from 'express';
import * as controller from '../controllers/adminController';

const router = Router();
router.post('/delete/:id', controller.deleteTrailHandler);

export default router;
