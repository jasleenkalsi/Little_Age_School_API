// src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './api/v1/routes/user.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', userRoutes); // ✅ NO trailing slash!
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;