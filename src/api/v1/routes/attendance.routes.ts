import { Router } from 'express';
import {
  markAttendance,
  getAllAttendance,
  getAttendanceByStudent
} from '../controllers/attendance.controller';

const router = Router();

router.post('/', markAttendance);                        // Mark attendance
router.get('/', getAllAttendance);                       // Get all records
router.get('/:studentId', getAttendanceByStudent);       // Get by student

export default router;
