import { RequestHandler } from 'express';
import { AttendanceRepository } from '../repository/attendance.repository';
import { Attendance } from '../models/attendance.model';

export const markAttendance: RequestHandler = async (req, res) => {
  const { student_id, date, status } = req.body;

  if (!student_id || !date || !status) {
    res.status(400).json({ message: 'student_id, date, and status are required' });
    return;
  }

  try {
    const record = await AttendanceRepository.mark({
      studentId: student_id, // ✅ match the Firestore field
      date,
      status
    });

    res.status(201).json({ message: 'Attendance marked successfully', record });
  } catch (error) {
    console.error('Error marking attendance:', error); // 🪵 Add for debugging
    res.status(500).json({ message: 'Failed to mark attendance', error });
  }
};

export const getAllAttendance: RequestHandler = async (_req, res) => {
  try {
    const records = await AttendanceRepository.getAll();
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance', error });
  }
};

export const getAttendanceByStudent: RequestHandler = async (req, res) => {
  const { student_id } = req.params;

  try {
    const records = await AttendanceRepository.getByStudent(student_id);
    if (records.length === 0) {
      res.status(404).json({ message: 'No records found' });
      return;
    }
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student attendance', error });
  }
};

export const updateAttendance: RequestHandler = async (req, res) => {
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
      res.status(200).json({ message: 'Attendance updated' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update attendance', error });
  }
};

export const deleteAttendance: RequestHandler = async (req, res) => {
  const { student_id, date } = req.params;

  try {
    const decodedDate = decodeURIComponent(date);
    const deleted = await AttendanceRepository.delete(student_id, decodedDate);
    if (!deleted) {
      res.status(404).json({ message: 'Record not found' });
    } else {
      res.status(200).json({ message: 'Attendance deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete attendance', error });
  }
};
