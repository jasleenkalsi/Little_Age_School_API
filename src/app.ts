import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import userRouter from './api/v1/routes/user.routes'; // Make sure the path is correct
import swaggerDocs from '../config/swagger'; // Optional Swagger setup

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/v1', userRouter); // ✅ Only use Router here

swaggerDocs(app); // ✅ If you’re using Swagger

export default app;
