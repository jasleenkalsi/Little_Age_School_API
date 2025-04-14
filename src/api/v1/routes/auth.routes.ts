import express from 'express';
import authRoutes from './';
import userRoutes from './user.routes';

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoutes);   // ✅ /api/v1/auth/signup
app.use('/api/v1', userRoutes);        // ✅ /api/v1/users, /fees, /attendance etc.

export default app;
