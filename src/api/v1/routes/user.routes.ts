// src/api/v1/routes/user.routes.ts
import { Router } from 'express';

import * as UserController from '../controllers/user.controller';
import * as AttendanceController from '../controllers/attendance.controller';
import * as FeeController from '../controllers/fee.controller';
import * as ActivityController from '../controllers/activity.controller';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

// ------------------- User Routes -------------------

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', UserController.getAllUsers);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/users', UserController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete('/users/:id', UserController.deleteUser);

// ------------------- Attendance Routes -------------------

/**
 * @swagger
 * /api/v1/attendance:
 *   post:
 *     summary: Mark student attendance
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Attendance marked
 */
router.post('/attendance', AttendanceController.markAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}:
 *   get:
 *     summary: Get attendance for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *     responses:
 *       200:
 *         description: Attendance data
 */
router.get('/attendance/:student_id', AttendanceController.getAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}/{date}:
 *   put:
 *     summary: Update attendance
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *       - in: path
 *         name: date
 *         required: true
 *     responses:
 *       200:
 *         description: Attendance updated
 */
router.put('/attendance/:student_id/:date', AttendanceController.updateAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}/{date}:
 *   delete:
 *     summary: Delete attendance
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *       - in: path
 *         name: date
 *         required: true
 *     responses:
 *       200:
 *         description: Attendance deleted
 */
router.delete('/attendance/:student_id/:date', AttendanceController.deleteAttendance);

// ------------------- Fee Routes -------------------

/**
 * @swagger
 * /api/v1/fees/{student_id}:
 *   post:
 *     summary: Add a fee payment
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *     responses:
 *       201:
 *         description: Fee added
 */
router.post('/fees/:student_id', FeeController.addFee);

/**
 * @swagger
 * /api/v1/fees/{student_id}:
 *   get:
 *     summary: Get fees for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *     responses:
 *       200:
 *         description: List of fees
 */
router.get('/fees/:student_id', FeeController.getFees);

/**
 * @swagger
 * /api/v1/fees/{student_id}/{payment_id}:
 *   put:
 *     summary: Update a fee record
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *       - in: path
 *         name: payment_id
 *         required: true
 *     responses:
 *       200:
 *         description: Fee updated
 */
router.put('/fees/:student_id/:payment_id', FeeController.updateFee);

/**
 * @swagger
 * /api/v1/fees/{student_id}/{payment_id}:
 *   delete:
 *     summary: Delete a fee record
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *       - in: path
 *         name: payment_id
 *         required: true
 *     responses:
 *       200:
 *         description: Fee deleted
 */
router.delete('/fees/:student_id/:payment_id', FeeController.deleteFee);

// ------------------- Activity Routes -------------------

/**
 * @swagger
 * /api/v1/activities:
 *   post:
 *     summary: Add a new activity
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Activity added
 */
router.post('/activities', ActivityController.addActivity);

/**
 * @swagger
 * /api/v1/activities:
 *   get:
 *     summary: Get all activities
 *     responses:
 *       200:
 *         description: List of activities
 */
router.get('/activities', ActivityController.getActivities);

/**
 * @swagger
 * /api/v1/activities/{title}:
 *   put:
 *     summary: Update an activity
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *     responses:
 *       200:
 *         description: Activity updated
 */
router.put('/activities/:title', ActivityController.updateActivity);

/**
 * @swagger
 * /api/v1/activities/{title}:
 *   delete:
 *     summary: Delete an activity
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *     responses:
 *       200:
 *         description: Activity deleted
 */
router.delete('/activities/:title', ActivityController.deleteActivity);

// ------------------- Auth Routes -------------------

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Signup successful
 */
router.post('/auth/signup', AuthController.signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/auth/login', AuthController.login);

export default router; 