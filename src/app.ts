import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './api/v1/routes/user.routes';
import feeRoutes from './api/v1/routes/fee.routes';
import attendanceRoutes from './api/v1/routes/attendance.routes';
import activityRoutes from './api/v1/routes/activity.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/', userRoutes);
app.use('/api/v1/fees', feeRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  
export default app;
