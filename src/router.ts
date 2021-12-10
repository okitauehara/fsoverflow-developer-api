import { Router } from 'express';
import questionRouter from './routers/questionsRouter';

const router = Router();

router.use('/questions', questionRouter);

export default router;
