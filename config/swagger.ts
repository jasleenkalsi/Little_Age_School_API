import { Router } from 'express';
const router = Router();

// Example: Add all your modules here
// router.use('/users', userRoutes);

router.get('/', (req, res) => {
  res.send('Welcome to Playway School Management API!');
});

export default router;
