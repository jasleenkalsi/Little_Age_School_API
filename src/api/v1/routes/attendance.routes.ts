// src/api/v1/routes/attendance.routes.ts
import { Router } from 'express';
import {
  markAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendance.controller';

/**
 * @swagger
 * tags:
 *   - name: Attendance
 *     description: Attendance related operations
 */
const router = Router();

/**
 * @swagger
 * /api/v1/attendance:
 *   post:
 *     tags: [Attendance]
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
 *                 enum:
 *                   - present
 *                   - absent
 *                   - late
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to mark attendance
 */
router.post('/attendance', markAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance records for a specific student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to fetch attendance for
 *     responses:
 *       200:
 *         description: Attendance data for the student
 *       404:
 *         description: No records found for the student
 *       500:
 *         description: Failed to fetch student attendance
 */
router.get('/attendance/:student_id', getAttendanceByStudent);

/**
 * @swagger
 * /api/v1/attendance/{student_id}/{date}:
 *   put:
 *     tags: [Attendance]
 *     summary: Update attendance for a specific student on a given date
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose attendance is to be updated
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date of the attendance to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - present
 *                   - absent
 *                   - late
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       400:
 *         description: Invalid status or request body
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Failed to update attendance
 */
router.put('/attendance/:student_id/:date', updateAttendance);

/**
 * @swagger
 * /api/v1/attendance/{student_id}/{date}:
 *   delete:
 *     tags: [Attendance]
 *     summary: Delete a specific attendance record for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose attendance is to be deleted
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date of the attendance record to be deleted
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Failed to delete attendance record
 */
router.delete('/attendance/:student_id/:date', deleteAttendance);

export default router;
