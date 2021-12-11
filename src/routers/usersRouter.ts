import { Router } from 'express';
import * as usersController from '../controllers/questionsController';

const router = Router();

router.post('/', usersController.postQuestion);

export default router;
