// src/api/v1/routes/user.routes.ts
import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as AttendanceController from '../controllers/attendance.controller';
import * as FeeController from '../controllers/fee.controller';
import * as ActivityController from '../controllers/activity.controller';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

// User routes
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Attendance routes
router.post('/attendance', AttendanceController.markAttendance);
router.get('/attendance/:student_id', AttendanceController.getAttendance);
router.put('/attendance/:student_id/:date', AttendanceController.updateAttendance);
router.delete('/attendance/:student_id/:date', AttendanceController.deleteAttendance);

// Fee routes
router.post('/fees/:student_id', FeeController.addFee);
router.get('/fees/:student_id', FeeController.getFees);
router.put('/fees/:student_id/:payment_id', FeeController.updateFee);
router.delete('/fees/:student_id/:payment_id', FeeController.deleteFee);

// Activity routes
router.post('/activities', ActivityController.addActivity);
router.get('/activities', ActivityController.getActivities);

// Auth routes
router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);

export default router;