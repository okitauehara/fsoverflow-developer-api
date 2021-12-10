import express from 'express';
import cors from 'cors';
import router from './router';
import handleErrors from './middlewares/handleErrors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrors);

export default app;
