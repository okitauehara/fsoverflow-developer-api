import { Router } from 'express';
import * as questionController from '../controllers/questionsController';

const router = Router();

router.post('/', questionController.postQuestion);

export default router;
