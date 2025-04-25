import { RequestHandler } from 'express';
import { AttendanceRepository } from '../repository/attendance.repository';

// ✅ MARK ATTENDANCE
export const markAttendance: RequestHandler = async (req, res): Promise<void> => {
  const { student_id, date, status } = req.body;

  if (!student_id || !date || !status) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  try {
    const record = await AttendanceRepository.mark({
      studentId: student_id,
      date,
      status,
    });
    res.status(201).json({
      message: 'Attendance marked successfully',
      record,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to mark attendance', error: error.message });
  }
};

// ✅ GET ATTENDANCE BY STUDENT
export const getAttendanceByStudent: RequestHandler = async (req, res): Promise<void> => {
  const { student_id } = req.params;

  try {
    const records = await AttendanceRepository.getByStudent(student_id);
    if (records.length === 0) {
      res.status(404).json({ message: 'No records found' });
      return;
    }
    res.status(200).json({ records });
  } catch (error: any) {
    console.error('🔥 Firestore fetch error:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch student attendance', error: error.message });
  }
};

// ✅ UPDATE ATTENDANCE
export const updateAttendance: RequestHandler = async (req, res): Promise<void> => {
  const { student_id, date } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ message: 'Status is required' });
    return;
  }

  try {
    const decodedDate = decodeURIComponent(date);
    const updated = await AttendanceRepository.update(student_id, decodedDate, status);
    if (!updated) {
      res.status(404).json({ message: 'Record not found' });
    } else {
      res.status(200).json({ message: 'Attendance updated successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update attendance', error: error.message });
  }
};

// ✅ DELETE ATTENDANCE
export const deleteAttendance: RequestHandler = async (req, res): Promise<void> => {
  const { student_id, date } = req.params;

  try {
    const decodedDate = decodeURIComponent(date);
    const deleted = await AttendanceRepository.delete(student_id, decodedDate);
    if (!deleted) {
      res.status(404).json({ message: 'Record not found' });
    } else {
      res.status(200).json({ message: 'Attendance deleted successfully' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to delete attendance', error: error.message });
  }
};
