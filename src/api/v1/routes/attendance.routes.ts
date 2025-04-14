// src/api/v1/routes/attendance.routes.ts
import { Router } from 'express';
import {
  markAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendance.controller';

const router = Router();

router.post('/attendance', markAttendance);
router.get('/attendance', getAllAttendance);
router.get('/attendance/:student_id', getAttendanceByStudent);
router.put('/attendance/:student_id/:date', updateAttendance);
router.delete('/attendance/:student_id/:date', deleteAttendance);

export default router;
