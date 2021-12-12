import { Router } from 'express';
import * as questionController from '../controllers/questionsController';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/', questionController.postQuestion);
router.post('/:id', validateToken, questionController.postAnswer);
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionsById);

export default router;
