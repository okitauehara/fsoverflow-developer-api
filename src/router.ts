import { Router } from 'express';
import questionRouter from './routers/questionsRouter';
import usersRouter from './routers/usersRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/questions', questionRouter);

export default router;
