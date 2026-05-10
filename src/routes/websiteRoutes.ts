import { Router } from 'express';
import * as controller from '../controllers/websiteController';

const router = Router();

router.get('/', controller.homeHandler);
router.get('/trails/:slug', controller.trailDetailHandler);
router.get('/regions', controller.regionsHandler);
router.get('/regions/:slug', controller.regionDetailHandler);

export default router;
