// src/api/v1/routes/user.routes.ts
import express from 'express';

import * as UserController from '../controllers/user.controller';
import {
  createFee,
  getFees,
  updateFee,
  deleteFee
} from '../controllers/fee.controller';

import {
  markAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendance.controller';

import * as ActivityController from '../controllers/activity.controller';
import { signup, login } from '../controllers/auth.controller';

const router = express.Router();

router.get('/test', (_req, res) => {
  res.status(200).json({ message: '✅ Routes are working' });
});

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
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               class:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details updated
 *       404:
 *         description: User not found
 */
router.put('/users/:id', UserController.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/users/:id', UserController.getUserById);

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
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               class:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid data provided
 */
router.post('/users', UserController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendance marked
 *       400:
 *         description: Invalid data provided
 */
router.post('/attendance', markAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}:
 *   get:
 *     summary: Get attendance for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance data
 *       404:
 *         description: No records found
 */
router.get('/attendance/:student_id', getAttendanceByStudent);

/**
 * @swagger
 * /api/v1/attendance/{student_id}/{date}:
 *   put:
 *     summary: Update attendance for a student by date
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attendance updated
 *       404:
 *         description: Record not found
 */
router.put('/attendance/:student_id/:date', updateAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}/{date}:
 *   delete:
 *     summary: Delete attendance record for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Attendance deleted
 *       404:
 *         description: Record not found
 */
router.delete('/attendance/:student_id/:date', deleteAttendance);

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
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *               datePaid:
 *                 type: string
 *                 format: date
 *               term:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fee added
 *       400:
 *         description: Invalid data provided
 */
router.post('/fees/:student_id', createFee);

/**
 * @swagger
 * /api/v1/fees/{student_id}:
 *   get:
 *     summary: Get all fees for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of fees
 *       404:
 *         description: No fees found
 */
router.get('/fees/:student_id', getFees);

/**
 * @swagger
 * /api/v1/fees/{student_id}/{payment_id}:
 *   put:
 *     summary: Update a fee record for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *               datePaid:
 *                 type: string
 *                 format: date
 *               term:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fee updated
 *       404:
 *         description: Fee record not found
 */
router.put('/fees/:student_id/:payment_id', updateFee);

/**
 * @swagger
 * /api/v1/fees/{student_id}/{payment_id}:
 *   delete:
 *     summary: Delete a fee record for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: payment_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fee deleted
 *       404:
 *         description: Fee record not found
 */
router.delete('/fees/:student_id/:payment_id', deleteFee);

// ------------------- Activity Routes -------------------
router.post('/activities', ActivityController.addActivity);
router.get('/activities', ActivityController.getActivities);
router.put('/activities/:title', ActivityController.updateActivity);
router.delete('/activities/:title', ActivityController.deleteActivity);

// ------------------ Auth Routes -------------------
router.post('/auth/signup', signup);
router.post('/auth/login', login);

export default router;
