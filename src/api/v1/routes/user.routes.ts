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
router.put('/users/:id', UserController.updateUser); // ✅ Correct
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
 *     responses:
 *       200:
 *         description: Attendance data
 */
router.get('/attendance/:student_id', getAttendanceByStudent);

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
router.put('/attendance/:student_id/:date', updateAttendance);

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
 *     responses:
 *       201:
 *         description: Fee added
 */
router.post('/fees/:student_id', createFee);

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
router.get('/fees/:student_id', getFees);

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
router.put('/fees/:student_id/:payment_id', updateFee);

/**
 * @swagger
 * /api/v1/fees/{student_id}/{payment_id}:
 *   delete:
 *     summary: Delete a fee record
 *     parameters:
 *       - in: path
 *         name: 
 *         required: true
 *       - in: path
 *         name: payment_id
 *         required: true
 *     responses:
 *       200:
 *         description: Fee deleted
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
